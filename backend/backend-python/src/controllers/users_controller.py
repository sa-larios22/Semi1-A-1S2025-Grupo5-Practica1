from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from prisma import Prisma
from database import db
from datetime import datetime

router = APIRouter()
db = Prisma()

# Modelo para actualizar usuario
class UserUpdate(BaseModel):
    firstName: str = None
    lastName: str = None
    profilePicture: str = None
    birthDate: str = None  # Lo recibimos como string (YYYY-MM-DD)

# Simulación de autenticación temporal (hasta implementar tokens)
async def get_current_user(email: str):
    await db.connect()
    user = await db.user.find_unique(where={"email": email})
    await db.disconnect()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

@router.get("/users/me")
async def get_user(email: str):
    """Obtener perfil del usuario"""
    user = await get_current_user(email)
    return {
        "id": user.id,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "profilePicture": user.profilePicture,
        "birthDate": str(user.birthDate),
        "role": user.role
    }

@router.put("/users/me")
async def update_user(email: str, user_data: UserUpdate):
    """Actualizar perfil del usuario"""
    user = await get_current_user(email)

    update_data = {}
    if user_data.firstName:
        update_data["firstName"] = user_data.firstName
    if user_data.lastName:
        update_data["lastName"] = user_data.lastName
    if user_data.profilePicture:
        update_data["profilePicture"] = user_data.profilePicture
    if user_data.birthDate:
        try:
            update_data["birthDate"] = datetime.strptime(user_data.birthDate, "%Y-%m-%d")
        except ValueError:
            raise HTTPException(status_code=400, detail="Formato de birthDate inválido. Usa YYYY-MM-DD.")

    await db.connect()
    updated_user = await db.user.update(where={"email": email}, data=update_data)
    await db.disconnect()

    if not updated_user:
        raise HTTPException(status_code=400, detail="No se pudo actualizar el usuario")

    return {"message": "Perfil actualizado exitosamente"}
