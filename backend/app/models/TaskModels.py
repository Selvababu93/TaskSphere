from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.base import Base
from uuid import uuid4
import enum
from .UserModels import User


class Comment(Base):
    __tablename__ = "comments"

    id = Column(String, primary_key=True, default=lambda: str(uuid4()), index=True)
    content = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    author_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"))
    task_id = Column(String, ForeignKey("tasks.id", ondelete="CASCADE"))

    author = relationship(User)
    task = relationship("Task", back_populates="comment_list")

class TaskStatus(str, enum.Enum):
    pending = "To Do"
    in_progress = "In Progress"
    completed = "Completed"


class Task(Base):
    __tablename__ = 'tasks'
    id = Column(String, primary_key=True, default=lambda : str(uuid4()))
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    notes = Column(String, nullable=True)

    author_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"))
    assignee_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"))

    task_type = Column(String, nullable=True)
    status = Column(Enum(TaskStatus), default=TaskStatus.pending, nullable=False)
    due_date = Column(DateTime, nullable=True)
    tag = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    comment_list = relationship("Comment", back_populates="task", cascade="all, delete-orphan")