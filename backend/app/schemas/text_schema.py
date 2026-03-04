from typing import Dict
from pydantic import BaseModel


class TextPayload(BaseModel):
    user_text: Dict[str, str]
