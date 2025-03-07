from fastapi import APIRouter, HTTPException
from fastapi import File, UploadFile
from botocore.exceptions import ClientError
import os
from pydantic import BaseModel
import bcrypt
import boto3
from prisma import Prisma
from datetime import datetime
from dotenv import load_dotenv

# Cargar variables desde .env
load_dotenv()

# Obtener valores de las variables de entorno
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION")
BUCKET_NAME = os.getenv("BUCKET_NAME")

# Inicializar cliente de S3 con credenciales desde .env
s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

router = APIRouter()
db = Prisma()

# Modelo para recibir datos en el registro de usuario
class UserRegister(BaseModel):
    firstName: str
    lastName: str
    email: str
    password: str
    birthDate: str  # Prisma usa DateTime, pero lo recibimos como string
    profilePicture: str = None
    role: str = "USER"

# Modelo para recibir datos en el login
class UserLogin(BaseModel):
    email: str
    password: str

@router.post("/auth/register")
async def register(user_data: UserRegister):
    await db.connect()

    # Verificar si el usuario ya existe
    existing_user = await db.user.find_unique(where={"email": user_data.email})
    if existing_user:
        await db.disconnect()
        raise HTTPException(status_code=400, detail="Email ya registrado")

    # Hashear la contraseña antes de guardarla
    hashed_password = bcrypt.hashpw(user_data.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    # Convertir birthDate de string a DateTime
    try:
        birth_date = datetime.strptime(user_data.birthDate, "%Y-%m-%d")  # Formato YYYY-MM-DD
    except ValueError:
        await db.disconnect()
        raise HTTPException(status_code=400, detail="Formato de birthDate inválido. Usa YYYY-MM-DD.")

    # Crear usuario en la base de datos
    new_user = await db.user.create(
        data={
            "firstName": user_data.firstName,
            "lastName": user_data.lastName,
            "email": user_data.email,
            "password": hashed_password,
            "birthDate": birth_date,
            "profilePicture": user_data.profilePicture,
            "role": user_data.role
        }
    )

    await db.disconnect()
    return {"message": "Usuario registrado exitosamente", "user_id": new_user.id}

@router.post("/auth/login")
async def login(user_data: UserLogin):
    await db.connect()

    # Buscar el usuario en la base de datos
    user = await db.user.find_unique(where={"email": user_data.email})
    if not user:
        await db.disconnect()
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")

    # Verificar la contraseña
    if not bcrypt.checkpw(user_data.password.encode("utf-8"), user.password.encode("utf-8")):
        await db.disconnect()
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")

    await db.disconnect()
    return {
        "message": "Inicio de sesión exitoso",
        "user": {
            "id": user.id,
            "email": user.email,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "birthDate": str(user.birthDate),
            "profilePicture": user.profilePicture,
            "role": user.role
        }
    }

# Upload a Profile Picture to a S3 Bucket
@router.post("/auth/upload-profile-picture")
async def upload_profile_picture(file: UploadFile):
    try:
        # Subir el archivo a S3
        s3_client.upload_fileobj(file.file, BUCKET_NAME, file.filename)

        # URL del archivo en S3
        file_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{file.filename}"

        return {"status": 201, "url": file_url}
    except Exception as e:
        return {"error": str(e)}