from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from fastapi import Depends
from app.models.UserModels import User

DATABASE_URL = "sqlite:///./testdb.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread" : False})

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

reusable_oauth2 = OAuth2PasswordBearer(tokenUrl=f"/login/access-token")

db_dependency = Annotated[Session, Depends(get_db)]
token_dependency = Annotated[str, Depends(reusable_oauth2)]

