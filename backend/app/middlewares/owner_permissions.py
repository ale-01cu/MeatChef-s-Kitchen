from .authorization import authorization
from fastapi import Depends, HTTPException, status
from app.schemas.user import UserSchema

def owner_permissions(
    user_id: str, user: dict = Depends(authorization)
) -> None:
    exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='No tiene permiso.'
    )

    try:

        if user_id != user.id and not user.is_superuser:
            raise exception

    except Exception as e:
        print(e)
        raise exception