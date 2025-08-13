from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.UserSchemas import UserCreate, UserPublic
from app.core.db import db_dependency
from app.crud.usercrud import get_user_by_email
from app.models.UserModels import User
from app.core.security import password_hash, get_current_active_superuser
from typing import List
from app.schemas.TaskSchemas import TaskBase, TaskCreate
from app.models.TaskModels import Task as TaskModel


router = APIRouter(tags=['tasks'], prefix='/tasks')



@router.post("/", response_model=TaskBase,
              dependencies=[Depends(get_current_active_superuser)])
async def create_task(task :TaskCreate, db : db_dependency ):
    task_create = TaskModel(title=task.title,
                             description=task.description,
                               notes=task.notes, author_id=int(1),
                               assignee_id=task.assignee_id,
                                 task_type=task.task_type,
                                 due_date=task.due_date)
    db.add(task_create)
    db.commit()
    db.refresh(task_create)
    return task_create
