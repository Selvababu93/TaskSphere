from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.UserSchemas import UserCreate, UserPublic
from app.core.db import db_dependency
from app.crud.usercrud import get_user_by_email
from app.models.UserModels import User
from app.core.security import password_hash, get_current_active_superuser
from typing import List

router = APIRouter(tags=['User'], prefix="/user")



@router.post("/create")
def create_user(user_create : UserCreate, db : db_dependency ):
    user = get_user_by_email(session=db, email=user_create.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="The User with this email already exists in the system",
        )
    user_create = User(email=user_create.email, user_name = user_create.user_name, is_active = user_create.is_active,is_superuser = user_create.is_superuser, password = password_hash(user_create.password))
    db.add(user_create)
    db.commit()
    db.refresh(user_create)
    return user_create

                                                                                                                                
@router.get("/all", response_model=List[UserPublic], dependencies=[Depends(get_current_active_superuser)])
def read_users(session : db_dependency):
    """Retrieve users"""

    all_users = session.query(User).all()
    return all_users