from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from typing import Any, Annotated
from jose import jwt, JWTError
from app.UserSchemas import TokenPayload
from fastapi import HTTPException, status, Depends
from app.core.db import db_dependency, token_dependency
from app.UserModels import User

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def password_hash(password: str):
    return pwd_context.hash(password)


def verify_password(password :str, hashed_password : str):
    return pwd_context.verify(password, hashed_password)


def create_access_token(subject : str | Any, expires_delta : timedelta) -> str:
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode = {"exp" : expire, "sub" : str(subject)}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, ALGORITHM)
    return encoded_jwt



def get_current_user(
    session: db_dependency,
    token: str = Depends(token_dependency),  # e.g. OAuth2PasswordBearer
) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        token_data = TokenPayload(**payload)
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user = session.get(User, token_data.sub)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")
    return user

CurrentUser = Annotated[User, Depends(get_current_user)]
 