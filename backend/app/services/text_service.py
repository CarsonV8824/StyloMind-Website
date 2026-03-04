from backend.app.schemas.text_schema import TextPayload


def get_text_payload() -> TextPayload:
    return TextPayload(user_text={"key": "value"})


def create_text_payload(payload: TextPayload) -> TextPayload:
    return payload
