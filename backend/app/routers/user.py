from fastapi import APIRouter, Depends, HTTPException, status
from app.cruds.user import (
    get_user_by_full_name,
    update_user,
    get_user_by_id,
    list_users as list_users_db,
    delete_user_by_id,
    update_user_by_superuser_db
)
from sqlalchemy.orm import Session
from settings.db import get_db
from app.schemas.user import UserSchema, UserUpdate, UserFull
from app.middlewares.authorization import authorization
from app.middlewares.owner_permissions import owner_permissions
from app.middlewares.role_permisisons import if_is_superuser
from app.models.user import UserModel
router = APIRouter()


@router.get('/user/{user_id}', tags=['get-user'])
async def get_user(user_id: str, db: Session = Depends(get_db)
) -> UserSchema:
    try:

        user = get_user_by_id(db, user_id)
        if not user: raise HTTPException(
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
    


@router.get('/users', tags=['list-users'],
    dependencies=[Depends(if_is_superuser)])
async def list_users(db: Session = Depends(get_db)
) -> list[UserSchema]:
    
    try:
        users = list_users_db(db)
        return users
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo listar los usuarios.'
        )


@router.get('/search-users/{full_name}', tags=['search-users'])
async def search_users(full_name: str, db: Session = Depends(get_db)
) -> list[UserSchema]:
    try:

        users = get_user_by_full_name(db, full_name)
        return users

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo realizar la busqueda.'
        )
    


@router.put('/user/{user_id}', tags=['update-user-by-user'],
    dependencies=[Depends(owner_permissions)])
async def update_user_by_user(user_id: str, user: UserUpdate,
    db: Session = Depends(get_db),
) -> UserSchema: 
    try:

        if not get_user_by_id(db, user_id): raise Exception()
        update_user(user_id, user, db)
        return db.query(UserModel).filter(
            UserModel.id == user_id,
            UserModel.is_active == True
        ).first()
    
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo actualizar el usuario.'
        )
    

@router.put('/user-full/{user_id}', tags=['update-user-by-superuser'],
    dependencies=[Depends(if_is_superuser)])
async def update_user_by_superuser(user_id: str, user: UserFull,
    db: Session = Depends(get_db),
) -> UserFull: 
    try:

        if not get_user_by_id(db, user_id): raise Exception()
        update_user_by_superuser_db(user_id, user, db)
        return db.query(UserModel).filter(
            UserModel.id == user_id,
            UserModel.is_active == True
        ).first()
    
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo actualizar el usuario.'
        )
    


@router.delete('/user/{user_id}', tags=['delete-users'],
    dependencies=[Depends(if_is_superuser)],
    status_code=status.HTTP_204_NO_CONTENT
)
async def delete_user(user_id: str, db: Session = Depends(get_db),
) -> None:
    try:
    
        if not get_user_by_id(db, user_id): return None
        delete_user_by_id(db, user_id)
        user_deleted = get_user_by_id(db, user_id)
        if user_deleted: raise Exception()
        return None
    
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo eliminar al usuario.'
        )