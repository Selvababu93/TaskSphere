from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from typing import Any, Annotated
from jose import jwt, JWTError
from app.schemas.UserSchemas import TokenPayload
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.core.db import db_dependency, token_dependency
from app.models.UserModels import User
# from app.core.jwt import decode_token
from app.core.config import settings


pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

bearer = HTTPBearer(auto_error=False)

def password_hash(password: str):
    return pwd_context.hash(password)


def verify_password(password :str, hashed_password : str):
    return pwd_context.verify(password, hashed_password)


def create_access_token(subject : str | Any, expires_delta : timedelta) -> str:
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode = {"exp" : expire, "sub" : str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET, settings.JWT_ALG)
    return encoded_jwt


def get_current_user(
    session: db_dependency,
    token: token_dependency,  # e.g. OAuth2PasswordBearer
) -> User:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALG])
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

def get_current_active_superuser(current_user : CurrentUser) -> User:
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="The user dosen't have enough privileges")
    return current_user




# def get_current_user(db : db_dependency, creds : HTTPAuthorizationCredentials = Depends(bearer)):
#     from app.crud.usercrud import get_user_by_id
#     if not creds:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
#     try:
#         payload = jwt.decode(creds.credentials)
#         if payload.get("type") != "access":
#             raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token type")
#         user_id = payload.get("sub")
#         user = get_user_by_id(db, user_id)
#         if not user or not user.is_active:
#             raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not active")
#         return user
#     except Exception:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    

# def get_current_user(
#     db: db_dependency,
#     creds: HTTPAuthorizationCredentials = Depends(bearer)
# ):
#     from app.crud.usercrud import get_user_by_id
#     if not creds:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Not authenticated"
#         )
#     try:
#         payload = decode_token(creds.credentials)
#         if payload.get("type") != "access":
#             raise HTTPException(
#                 status_code=status.HTTP_401_UNAUTHORIZED,
#                 detail="Invalid token type"
#             )

#         user_id = payload.get("sub")
#         user = get_user_by_id(db, user_id)
#         if not user or not user.is_active:
#             raise HTTPException(
#                 status_code=status.HTTP_401_UNAUTHORIZED,
#                 detail="User not active"
#             )
#         return user
#     except Exception:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid or expired token"
        # )

 