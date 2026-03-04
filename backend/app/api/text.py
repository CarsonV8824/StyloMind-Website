from fastapi import APIRouter
from backend.app.schemas.text_schema import TextPayload
from backend.app.services.text_service import create_text_payload, get_text_payload

router = APIRouter(prefix="/text", tags=["text"])


@router.get("", response_model=TextPayload)
def read_text() -> TextPayload:
    return get_text_payload()


@router.post("", response_model=TextPayload)
def create_text(payload: TextPayload) -> TextPayload:
    return create_text_payload(payload)
