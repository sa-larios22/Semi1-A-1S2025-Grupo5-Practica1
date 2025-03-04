from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from prisma import Prisma
from datetime import datetime
from typing import List

router = APIRouter()
db = Prisma()

# Modelo para registrar una compra
class PurchaseCreate(BaseModel):
    userId: int
    bookId: int

@router.post("/purchases")
async def create_purchase(purchase_data: PurchaseCreate):
    """Registrar una compra"""
    await db.connect()

    # Verificar si el usuario y el libro existen
    user = await db.user.find_unique(where={"id": purchase_data.userId})
    book = await db.book.find_unique(where={"id": purchase_data.bookId})

    if not user:
        await db.disconnect()
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    if not book:
        await db.disconnect()
        raise HTTPException(status_code=404, detail="Libro no encontrado")

    # Registrar la compra
    new_purchase = await db.purchase.create(data={
        "userId": purchase_data.userId,
        "bookId": purchase_data.bookId,
        "purchaseDate": datetime.now()
    })

    await db.disconnect()
    return {"message": "Compra registrada exitosamente", "purchase_id": new_purchase.id}

@router.get("/purchases/{user_id}")
async def get_user_purchases(user_id: int):
    """Obtener todas las compras de un usuario"""
    await db.connect()
    
    purchases = await db.purchase.find_many(
        where={"userId": user_id},
        include={"book": True} 
    )

    await db.disconnect()

    if not purchases:
        raise HTTPException(status_code=404, detail="No se encontraron compras para este usuario")

    return [
        {
            "purchase_id": purchase.id,
            "purchaseDate": str(purchase.purchaseDate),
            "book": {
                "id": purchase.book.id,
                "title": purchase.book.title,
                "author": purchase.book.author,
                "coverImage": purchase.book.coverImage,
                "pdfUrl": purchase.book.pdfUrl
            }
        }
        for purchase in purchases
    ]
