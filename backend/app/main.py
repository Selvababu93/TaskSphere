from fastapi import FastAPI
from app.core.db import engine
from app.models import UserModels
from app.api.routes import user, login
from starlette.middleware.cors import CORSMiddleware

UserModels.Base.metadata.create_all(engine)

app = FastAPI()

app.include_router(user.router)
app.include_router(login.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {"Hello Wealth"}


