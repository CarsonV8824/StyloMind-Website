from fastapi import APIRouter
from backend.app.api.auth import router as auth_router
from backend.app.api.text import router as text_router

router = APIRouter()
router.include_router(text_router)
router.include_router(auth_router)
