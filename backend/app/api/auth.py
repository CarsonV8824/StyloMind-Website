from fastapi import APIRouter, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from backend.app.schemas.auth_schema import AuthResponse, LoginRequest, RegisterRequest
from backend.app.services.auth_service import (
    get_username_by_token,
    login_user,
    register_user,
)

router = APIRouter(tags=["auth"])
security = HTTPBearer()


@router.post("/auth/register", response_model=AuthResponse)
def register(payload: RegisterRequest) -> AuthResponse:
    return AuthResponse(**register_user(payload.username, payload.password))


@router.post("/auth/login", response_model=AuthResponse)
def login(payload: LoginRequest) -> AuthResponse:
    return AuthResponse(**login_user(payload.username, payload.password))


@router.get("/me")
def me(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict[str, str]:
    username = get_username_by_token(credentials.credentials)
    return {"username": username}
