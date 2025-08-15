import time
from jose import jwt
from typing import Any, Dict
from app.core.config import settings



# def create_token(sub: str, token_type: str, expires_in_seconds:int, extra: Dict[str, Any] | None = None):
#     now = int(time.time())
#     payload: Dict[str, Any] = {
#         "sub" : sub,
#         "type" : token_type,
#         "iat" : now,
#         "exp" : now + expires_in_seconds,
#     }
#     if extra:
#         payload.update(extra)
#     return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALG)

# def create_access_token(user_id: str):
#     return create_token(
#         sub=user_id,
#         token_type="access",
#         expires_in_seconds=int(settings.ACCESS_EXPIRES.total_seconds()),
#     )

# def create_refresh_token(user_id:str, token_version:int):
#     """ Include token_version for rotation/invalidation"""
#     return create_token(
#         sub=user_id,
#         token_type="refresh",
#         expires_in_seconds=int(settings.REFRESH_EXPIRES.total_seconds()),
#         extra={"v" : token_version},
#     )


# def decode_token(token: str) -> dict:
#     return jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALG])


