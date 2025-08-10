from app.core.db import db_dependency
from app.UserModels import User
from app.crud.usercrud import get_user_by_email
from app.core.security import verify_password


def authenticate(*, session : db_dependency, email : str, password : str) -> User | None :
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password=password, hashed_password=db_user.password):
        return None
    return db_user

