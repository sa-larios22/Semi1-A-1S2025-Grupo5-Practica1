from fastapi import APIRouter
from controllers.book_controller import router as book_router

router = APIRouter()
router.include_router(book_router, prefix="/api", tags=["Books"])
