from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.UserSchemas import UserCreate, UserPublic, UserNameUpdate, UserEmailUpdate
from app.core.db import db_dependency
from app.crud.usercrud import get_user_by_email
from app.models.UserModels import User
from app.core.security import password_hash, get_current_active_superuser, CurrentUser
from typing import List

router = APIRouter(tags=['User'], prefix="/user")



@router.post("/create", response_model=UserPublic)
async def create_user(user_create : UserCreate, db : db_dependency ):
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
async def read_users(session : db_dependency):
    """Retrieve users"""

    all_users = session.query(User).all()
    return all_users

@router.patch("/update/username/{user_id}", response_model=UserNameUpdate)
async def update_username(id : str, current_user : CurrentUser, db : db_dependency, request: UserNameUpdate):
    user = db.query(User).filter(User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User Not Found")
    user.user_name = request.user_name
    db.commit()
    return user
    

@router.patch("/update/email/{id}", response_model=UserEmailUpdate)
async def update_email(id : str, current_user : CurrentUser, db : db_dependency, request : UserEmailUpdate):
    user = db.query(User).filter(User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User Not Found")
    user.email = request.email
    db.commit()
    return user

@router.delete("/delete/{id}")
async def delete_user(id : str, current_user : CurrentUser, db : db_dependency):
    user = db.query(User).filter(User.id == id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User Not Found")
    user.delete(synchronize_session=False)
    db.commit()
    return "Delete Operation Completed"
