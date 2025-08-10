import uuid
from typing import Any
from sqlalchemy.orm import Session
from app.schemas.UserSchemas import UserCreate
from app.models.UserModels import User
from app.core.db import db_dependency



def get_user_by_email(*, session : db_dependency, email : str) -> User:
    user_query = session.query(User).filter(User.email == email).first()
    return user_query


