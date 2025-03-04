import os
from dotenv import load_dotenv
from prisma import Prisma

# Cargar las variables de entorno
load_dotenv()

# Verificar si DATABASE_URL está definida
if "DATABASE_URL" not in os.environ:
    raise RuntimeError("DATABASE_URL no está definida. Verifica tu archivo .env")

db = Prisma()
