from pydantic import BaseModel, EmailStr



# Shared property Base
class UserPublic(BaseModel):
    email : EmailStr
    is_active : bool
    is_superuser : bool
    user_name : str

class Config:
    orm_mode = True

# Properties to receive from API to create
class UserCreate(UserPublic):
    password : str


class UserRegister(UserPublic):
    email : EmailStr
    password : str
    full_name : str


# Properties to receive on API to update
class UserUpdate(UserPublic):
    email : EmailStr
    password : str


class UserUpdateMe(BaseModel):
    full_name : str
    email : EmailStr


class UserUpdatePassword(BaseModel):
    current_password : str
    new_password : str


class TokenPayload(BaseModel):
    sub : str | None = None

