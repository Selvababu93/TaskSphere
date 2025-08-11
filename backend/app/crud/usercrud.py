import uuid
from typing import Any
from sqlalchemy.orm import Session
from app.schemas.UserSchemas import UserCreate
from app.models.UserModels import User
from app.core.db import db_dependency
from fastapi import HTTPException, status
from app.core.security import verify_password


def get_user_by_email(*, session : db_dependency, email : str) -> User:
    user_query = session.query(User).filter(User.email == email).first()
    return user_query


def get_user(session : db_dependency, email : str, password : str) -> User:
    user = session.query(User.email == email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if not verify_password(password, user.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid credentials")

