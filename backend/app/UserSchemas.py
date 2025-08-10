from pydantic import BaseModel, EmailStr



# Shared property Base
class UserBase(BaseModel):
    email : EmailStr
    is_active : bool
    is_superuser : bool
    user_name : str

class Config:
    orm_mode = True

# Properties to receive from API to create
class UserCreate(UserBase):
    password : str


class UserRegister(BaseModel):
    email : EmailStr
    password : str
    full_name : str


# Properties to receive on API to update
class UserUpdate(UserBase):
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

