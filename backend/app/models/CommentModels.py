
from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.base import Base
from uuid import uuid4
import enum
from .UserModels import User
from .TaskModels import Task


class Comment(Base):
    __tablename__ = "comments"

    id = Column(String, primary_key=True, default=lambda: str(uuid4()), index=True)
    content = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    author_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"))
    task_id = Column(String, ForeignKey("tasks.id", ondelete="CASCADE"))

    author = relationship(User)
    task = relationship(Task, back_populates="comment_list")