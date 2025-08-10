from fastapi import FastAPI
from app.core.db import engine
import app.UserModels
from app.api.routes import user, login

app.UserModels.Base.metadata.create_all(engine)

app = FastAPI()

app.include_router(user.router)
app.include_router(login.router)

@app.get('/')
def read_root():
    return {"Hello Wealth"}


