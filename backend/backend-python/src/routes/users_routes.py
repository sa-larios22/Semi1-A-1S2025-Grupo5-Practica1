from fastapi import APIRouter
from controllers.users_controller import router as user_router

router = APIRouter()
router.include_router(user_router, prefix="/api", tags=["Users"])
