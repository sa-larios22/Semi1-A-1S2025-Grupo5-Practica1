import json  # Importamos JSON para manejar correctamente los datos
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from prisma import Prisma
from typing import List, Optional

router = APIRouter()
db = Prisma()

# Modelo para crear o actualizar libros
class BookCreate(BaseModel):
    title: str
    author: str
    coverImage: str
    synopsis: str = None
    categories: dict 
    year: int
    pdfUrl: str
    
class BookResponse(BookCreate):
    id: int 

@router.post("/books")
async def create_book(book_data: BookCreate):
    """Crear un nuevo libro"""
    print("Datos recibidos:", book_data.dict()) 

    await db.connect()

    try:
        new_book = await db.book.create(data={
            "title": book_data.title,
            "author": book_data.author,
            "coverImage": book_data.coverImage,
            "synopsis": book_data.synopsis,
            "categories": json.dumps(book_data.categories),  
            "year": book_data.year,
            "pdfUrl": book_data.pdfUrl
        })
    except Exception as e:
        print("Error en Prisma:", e) 
        await db.disconnect()
        raise HTTPException(status_code=500, detail="Error interno en la base de datos")

    await db.disconnect()
    return {"message": "Libro creado exitosamente", "book_id": new_book.id}

@router.get("/books", response_model=List[BookResponse])
async def get_books():
    """Obtener todos los libros"""
    await db.connect()
    books = await db.book.find_many()
    await db.disconnect()

    # Verificar si categories es un string antes de convertirlo a dict
    for book in books:
        if isinstance(book.categories, str):
            book.categories = json.loads(book.categories)

    return books

# buscar titulo por  synopsis like
@router.get("/books/search")
async def search_books(
    title: Optional[str] = Query(None), 
    synopsis: Optional[str] = Query(None),
    response_model=List[BookResponse]
):
    """Buscar libros por título y/o sinopsis"""
    await db.connect()

    filters = {}

    if title:
        filters["title"] = {"contains": title}
    if synopsis:
        filters["synopsis"] = {"contains": synopsis}

    books = await db.book.find_many(where=filters)
    
    await db.disconnect()

    # Convertir categories de string a dict si es necesario
    for book in books:
        if isinstance(book.categories, str):
            book.categories = json.loads(book.categories)

    return books

@router.get("/books/{book_id}")
async def get_book(book_id: int, response_model=List[BookResponse]):
    """Obtener un libro por ID"""
    await db.connect()
    book = await db.book.find_unique(where={"id": book_id})
    await db.disconnect()

    if not book:
        raise HTTPException(status_code=404, detail="Libro no encontrado")

    # Verificar si categories es un string antes de convertirlo
    if isinstance(book.categories, str):
        book.categories = json.loads(book.categories)

    return book

@router.put("/books/{book_id}")
async def update_book(book_id: int, book_data: BookCreate):
    """Actualizar un libro"""
    await db.connect()
    
    try:
        updated_book = await db.book.update(
            where={"id": book_id},
            data={
                "title": book_data.title,
                "author": book_data.author,
                "coverImage": book_data.coverImage,
                "synopsis": book_data.synopsis,
                "categories": json.dumps(book_data.categories),  
                "year": book_data.year,
                "pdfUrl": book_data.pdfUrl
            }
        )
    except Exception as e:
        print("Error en Prisma:", e) 
        await db.disconnect()
        raise HTTPException(status_code=500, detail="Error interno en la base de datos")

    await db.disconnect()

    if not updated_book:
        raise HTTPException(status_code=400, detail="No se pudo actualizar el libro")

    return {"message": "Libro actualizado exitosamente"}

@router.delete("/books/{book_id}")
async def delete_book(book_id: int):
    """Eliminar un libro"""
    await db.connect()
    
    try:
        deleted_book = await db.book.delete(where={"id": book_id})
    except Exception as e:
        print("Error en Prisma:", e)
        await db.disconnect()
        raise HTTPException(status_code=500, detail="Error interno en la base de datos")

    await db.disconnect()

    if not deleted_book:
        raise HTTPException(status_code=400, detail="No se pudo eliminar el libro")

    return {"message": "Libro eliminado exitosamente"}



