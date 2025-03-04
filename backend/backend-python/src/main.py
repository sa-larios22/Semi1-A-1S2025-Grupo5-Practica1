from fastapi import FastAPI
from contextlib import asynccontextmanager
from database import db
from routes.auth_routes import router as auth_routes
from routes.users_routes import router as user_routes
from routes.book_routes import router as book_routes
from routes.purchase_routes import router as purchase_routes

# Usamos Lifespan en lugar de on_event
@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.connect()
    yield
    await db.disconnect()

app = FastAPI(lifespan=lifespan)

# Registrar las rutas
app.include_router(auth_routes)
app.include_router(user_routes)
app.include_router(book_routes)
app.include_router(purchase_routes)

@app.get("/")
async def root():
    return {"message": "API funcionando correctamente"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
