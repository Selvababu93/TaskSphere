from sqlalchemy import Column, String, Integer, Boolean
from app.core.base import Base
from uuid import uuid4


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    user_name = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    password = Column(String, nullable=False)



