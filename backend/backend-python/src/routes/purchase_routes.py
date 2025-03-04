from fastapi import APIRouter
from controllers.purchase_controller import router as purchase_router

router = APIRouter()
router.include_router(purchase_router, prefix="/api", tags=["Purchases"])
