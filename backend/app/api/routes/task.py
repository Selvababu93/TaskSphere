from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.UserSchemas import UserCreate, UserPublic
from app.core.db import db_dependency
from app.crud.usercrud import get_user_by_email
from app.models.UserModels import User
from app.core.security import password_hash, get_current_active_superuser, CurrentUser
from typing import List
from app.schemas.TaskSchemas import TaskBase, TaskCreate, TaskUpdate
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


@router.get("/", response_model=List[TaskBase])
async def read_tasks(current_user : CurrentUser, db : db_dependency):
    tasks = db.query(TaskModel).all()
    return tasks


@router.patch("update/{task_id}", response_model=TaskBase)
async def update_task(task_id : str, current_user : CurrentUser, db : db_dependency, request : TaskUpdate):
    db_task = db.query(TaskModel).filter(TaskModel.id == task_id).first()
   
    if not db_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Provided Task id : {id} Not found")
    for field, value in request.dict(exclude_unset=True).items():
        setattr(db_task, field, value)
    
    db.commit()
    db.refresh(db_task)
    return db_task

@router.delete('/delete/{task_id}')
async def delete_task(task_id : str, current_user : CurrentUser, db : db_dependency):
    task = db.query(TaskModel).filter(TaskModel.id == task_id)
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Provided Task id : {id} Not found")
    task.delete(synchronize_session=False)
    db.commit()
    return "Delete Operation Completed"