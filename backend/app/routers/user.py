from fastapi import APIRouter, Depends, HTTPException, status
from app.models.userCRUD import get_user, get_user_by_email
from sqlalchemy.orm import Session
from settings.db import get_db
from app.schemas.user import UserSchema
from app.middlewares.authorization import authorization
from app.middlewares.role_permisisons import if_is_teacher
router = APIRouter()


@router.post('/user/{email}', 
    tags=['get user'], 
    dependencies=[Depends(authorization), Depends(if_is_teacher)]
)
async def get_user(
    email: str, db: Session = Depends(get_db)
) -> UserSchema:

    try:
        user = get_user_by_email(db, email)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='No se encontro ningun usuario.',
            )
        return user
    
    except HTTPException as e:
        print(e)
        raise e
        
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Error al buscar el usuario.',
        )
