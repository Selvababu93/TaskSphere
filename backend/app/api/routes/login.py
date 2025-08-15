from fastapi import APIRouter, HTTPException, status, Depends, Response, Request
from fastapi.security import OAuth2PasswordRequestForm
from app.core.db import db_dependency
from app.schemas.UserSchemas import UserPublic, LoginSchema
from app.schemas.TokenSchemas import Token
from app.core.security import CurrentUser, verify_password, create_access_token
from app.core.config import settings
from app.crud import logincrud
from app.crud.usercrud import get_user_by_email, get_user_by_id
# from app.core.jwt import create_access_token, create_refresh_token, decode_token
from datetime import timedelta
from typing import Annotated

router = APIRouter(tags=['Login'], prefix="/auth")

def set_refresh_cookie(resp: Response, refresh_token: str):
    resp.set_cookie(
        key=settings.REFRESH_COOKIE_NAME,
        value=refresh_token,
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite=settings.COOKIE_SAMESITE,
        domain=settings.COOKIE_DOMAIN,
        max_age=int(settings.REFRESH_EXPIRES.total_seconds()),
        path="/auth", #restrict to auth endpoints
    )

def clear_refresh_cookie(resp: Response):
    resp.delete_cookie(
        key=settings.REFRESH_COOKIE_NAME,
        domain=settings.COOKIE_DOMAIN,
        path="/auth",
    )

@router.post("/logout")
def logout(response : Response, db: db_dependency, request: Request = None):
    """
    (Optional) if you want to rotate/invalidate all refresh tokens on logout:
    if you track user, bump token_version here too.
    """
    clear_refresh_cookie(response)
    return {"message" : "logged out"}


# fixed return should be user schemas not -> Any
@router.post("/login/test-token")
def test_token(current_user: CurrentUser) -> UserPublic:
    """Test access token"""

    return current_user

@router.post('/login/')
def login_access_token(session : db_dependency, form_data : Annotated[OAuth2PasswordRequestForm, Depends()] )-> Token:
    user = logincrud.authenticate(session=session, email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = settings.ACCESS_EXPIRES
    return Token(access_token=create_access_token(user.id, expires_delta=access_token_expires), token_type='bearer')


# @router.post("/login")
# def login(form: LoginSchema, response: Response, db: db_dependency):
#     """
#     Expect {"email": "...", "password": "..."}
#     """
#     email = form.email
#     password = form.password

#     user = get_user_by_email(email=email, session=db)
#     if not user or not verify_password(password, user.password):
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="invalid credentials")

#     access = create_access_token(str(user.id))
#     refresh = create_refresh_token(str(user.id), user.token_version)
#     set_refresh_cookie(response, refresh)
#     return {"access_token": access, "token_type": "bearer"}

# @router.post("/refresh")
# def refresh_token(request: Request, response: Response, db : db_dependency):
#     rt = request.cookies.get(settings.REFRESH_COOKIE_NAME)
#     if not rt:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No refresh token")
    
    # try:
    #     payload = decode_token(rt)
    #     if payload.get("type") != "refresh":
    #         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No refresh token")
        
    #     user_id = payload.get("sub")
    #     v = payload.get("v")
    #     user = get_user_by_id(db, user_id)
    #     if not user or not user.is_active:
    #         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not active")
        
    #     # check token rotaion version
    #     if user.token_version != v:
    #         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token outdated")
        
    #     # Rotate refresh token: bump version and issue new cookie
    #     user.token_version +=1
    #     db.commit()
    #     db.refresh(user)

    #     new_access = create_access_token(str(user.id))
    #     new_refresh = create_refresh_token(str(user.id), user.token_version)
    #     set_refresh_cookie(response, new_refresh)
    #     return {"access_token" : new_access, "token_type": "bearer"}
    
    # except Exception:
    #     raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired refresh token")
    

# @router.post('/', status_code=status.HTTP_202_ACCEPTED)
# def login( db : db_dependency,request : OAuth2PasswordRequestForm = Depends(),):
#     user = usercrud.get_user(db,request.username, request.password )

#     # generate jwt access token
    
#     access_token = create_access_token(
#         data={"sub": user.email}
#     )
#     return {"access_token" : access_token, "token_type" : "bearer"}

