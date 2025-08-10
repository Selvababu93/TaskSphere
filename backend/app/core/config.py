import secrets
import warnings
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
    pass