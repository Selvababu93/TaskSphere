from pydantic import BaseModel, Field
from uuid import uuid4
from typing import Optional, List
from datetime import datetime
from .CommentSchemas import Comment
from enum import Enum


class TaskStatus(str, Enum):
    todo = "To Do"
    in_progress = "In Progress"
    completed = "Completed"


class TaskBase(BaseModel):
    id : str = Field(default_factory=lambda: str(uuid4()))
    title : str
    description : str
    notes: Optional[str] = None
    assigned : Optional[str] = None
    task_type : Optional[str] = None
    tag : Optional[str] = None
    status : TaskStatus = TaskStatus.todo
    due_date : Optional[datetime] = None
    created_at : Optional[datetime] = None
    updated_at : Optional[datetime] = None
    comments : List[Comment] = Field(default_factory=list)

    class Config:
        from_attributes = True


class Taskread(BaseModel):
    id : str = Field(default_factory=lambda: str(uuid4()))
    title : str
    description : str
    notes: Optional[str] = None
    assigned : Optional[str] = None
    task_type : Optional[str] = None
    tag : Optional[str] = None
    status : TaskStatus = TaskStatus.todo
    due_date : datetime
    created_at : Optional[datetime] = None
    updated_at : Optional[datetime] = None

    class Config:
        from_attributes = True

class TaskCreate(BaseModel):
    title: str
    description: str
    notes: Optional[str] = None
    assignee_id: Optional[int] = None
    task_type: Optional[str] = None
    status: TaskStatus = TaskStatus.todo
    due_date: Optional[datetime] = None

    class Config:
        from_attributes = True