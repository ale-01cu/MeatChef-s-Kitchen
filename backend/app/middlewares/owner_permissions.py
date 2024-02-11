from .authorization import authorization
from fastapi import Depends, HTTPException, status
from app.schemas.user import UserSchema
from app.cruds.order import get_order_by_id
from sqlalchemy.orm import Session
from settings.db import get_db

def owner_permissions(user_id: str, user: UserSchema = Depends(authorization)
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
    

def order_owner_permissions(
    order_id: str, 
    user: UserSchema = Depends(authorization),
    db: Session = Depends(get_db)
) -> None:
    
    exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='No tiene permiso.'
    )

    try:
        order = get_order_by_id(db, order_id)
        if user.id != order.user_id and not user.is_superuser:
            raise exception

    except Exception as e:
        print(e)
        raise exception