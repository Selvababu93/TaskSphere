from fastapi import APIRouter, HTTPException, status, Depends
from app.core.db import db_dependency
from typing import Annotated, Any
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.TokenSchemas import Token
from app.schemas.UserSchemas import UserPublic
from app.crud import usercrud, logincrud
from datetime import datetime, timedelta
from app.core.security import ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token, CurrentUser

router = APIRouter(tags=['Login'], prefix='/auth')

@router.post('/login/access-token')
def login_access_token(session : db_dependency, form_data : Annotated[OAuth2PasswordRequestForm, Depends()] )-> Token:
    user = logincrud.authenticate(session=session, email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(access_token=create_access_token(user.id, expires_delta=access_token_expires), token_type='bearer')


# fixed return should be user schemas not -> Any
@router.post("/login/test-token")
def test_token(current_user: CurrentUser) -> UserPublic:
    """Test access token"""

    return current_user

# @router.post('/', status_code=status.HTTP_202_ACCEPTED)
# def login( db : db_dependency,request : OAuth2PasswordRequestForm = Depends(),):
#     user = usercrud.get_user(db,request.username, request.password )

#     # generate jwt access token
    
#     access_token = create_access_token(
#         data={"sub": user.email}
#     )
#     return {"access_token" : access_token, "token_type" : "bearer"}

