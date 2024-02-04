from fastapi import HTTPException, status, Depends
from .authorization import authorization

def if_is_superuser(user: dict = Depends(authorization)):
    if not user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='No Autorizado'
        )
    
def if_is_staff(user: dict = Depends(authorization)):
    if not user.is_staff and not user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='No Autorizado'
        )
    
def if_is_teacher(user: dict = Depends(authorization)):
    if not user.is_teacher and not user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='No Autorizado'
        )
        