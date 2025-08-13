from pydantic import BaseModel, Field
from uuid import uuid4
from datetime import datetime

class Comment(BaseModel):
    id : str = Field(default_factory=lambda: str(uuid4()))
    content : str
    created_at : datetime = Field(default_factory=datetime.utcnow)
    author : str