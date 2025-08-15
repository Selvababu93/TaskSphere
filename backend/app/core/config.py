import secrets
import warnings
from datetime import datetime, timedelta
from typing import Annotated, Any, Literal
from pydantic import (
    AnyUrl,BeforeValidator, EmailStr, HttpUrl, PostgresDsn, computed_field, model_validator
)

from pydantic_core import MultiHostUrl
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing_extensions import Self




def parse_cors(v: Any) -> list[str] | str:
    if isinstance(v, str) and not v.startswith("["):
        return [i.strip() for i in v.split(",")]
    elif isinstance(v, list | str):
        return v
    raise ValueError(v)


class Settings(BaseSettings):
    JWT_SECRET : str = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    JWT_ALG : str = "HS256"
    ACCESS_EXPIRES : timedelta = timedelta(minutes=15)
    REFRESH_EXPIRES : timedelta = timedelta(days=3)
    REFRESH_COOKIE_NAME : str = "refresh_token"
    COOKIE_SECURE : bool = False #will need to change in production to HTTPS
    COOKIE_SAMESITE : str = "lax" #"strict" or "none" (with HTTPS)
    COOKIE_DOMAIN : str | None = None


settings = Settings()