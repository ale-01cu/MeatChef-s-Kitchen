from fastapi import APIRouter, Depends, HTTPException, status, Form, File, UploadFile
from app.cruds.user import (
    get_user_by_full_name,
    update_user,
    get_user_by_id,
    list_users as list_users_db,
    delete_user_by_id,
    update_user_by_superuser_db,
    get_user_by_email,
    get_user_by_phone_number,
    create_user_db,
    get_user_by_admin_by_id
)
from app.utils.password import hash_password
from sqlalchemy.orm import Session
from settings.db import get_db
from app.schemas.user import (
    UserSchema, 
    UserUpdate, 
    UserFull, 
    UserListSchema,
    UserSchema
)
from app.middlewares.authorization import authorization
from app.middlewares.owner_permissions import owner_permissions
from app.middlewares.role_permisisons import if_is_superuser
from app.models.user import UserModel
from app.utils.save_file import save_file
from app.utils.delete_file import delete_file
from typing import Optional
router = APIRouter()


@router.get('/profile/{user_id}', tags=['get-user'])
async def get_profile(user_id: str, db: Session = Depends(get_db)
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
    

@router.get('/user', tags=['get-fulluser'])
async def get_user_by_user(db: Session = Depends(get_db),
    user: UserFull = Depends(authorization)
) -> UserFull:
    try:
        user = get_user_by_id(db, user.id)
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
    
@router.get('/user/{user_id}', tags=['get-fulluser'],
    dependencies=[Depends(if_is_superuser)])
async def get_user_by_admin(db: Session = Depends(get_db),
    user_id: str = ''
) -> UserListSchema:
    try:
        user = get_user_by_admin_by_id(db, user_id)
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
) -> list[UserListSchema]:
    
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
    

@router.post('/user', tags={'user-create'})
async def create_user(
    email: str = Form(),
    full_name: str = Form(),
    phone_number: str = Form(),
    password: str = Form(),
    avatar: Optional[UploadFile] = File(''),
    is_superuser: Optional[bool] = Form(False),
    is_staff: Optional[bool] = Form(False),
    is_teacher: Optional[bool] = Form(False),
    is_active: bool = Form(),
    db: Session = Depends(get_db)
) -> UserListSchema:
    try:
        foundEmail = get_user_by_email(db, email)
        if foundEmail: 
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El email ya esta en uso.",
            )
        
        found_phone_number = get_user_by_phone_number(db, phone_number)
        if found_phone_number:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El numero de telefono ya esta en uso.",
            )
        
        file_info = await save_file(
            avatar, 
            f'media/avatar/{email}',
        )
        
        user = UserSchema(
            email=email,
            full_name=full_name,
            phone_number=phone_number,
            password=password,
            avatar=file_info.path,
            is_superuser=is_superuser,
            is_staff=is_staff,
            is_teacher=is_teacher,
            is_active=is_active
        )

        hashed_password = hash_password(password)
        user.password = hashed_password
        new_user = create_user_db(db, user)
        return new_user
    
    except HTTPException as e:
        print(e)
        raise e
    
    except Exception as e:
        print(e) 

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="No se pudo crear el usuario.",
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
async def update_user_by_superuser(
    user_id: str,     
    email: str = Form(),
    full_name: str = Form(),
    phone_number: str = Form(),
    avatar: Optional[UploadFile] = File(),
    is_superuser: bool = Form(),
    is_staff: bool = Form(),
    is_teacher: bool = Form(),
    is_active: bool = Form(),
    db: Session = Depends(get_db),
) -> UserListSchema: 
    try:

        user = get_user_by_admin_by_id(db, user_id)
        if not user: raise Exception()

        if avatar.filename:
            path = f'media/avatar/{email}'
            avatar_info = await save_file(avatar, path)
            if user.avatar != avatar_info.path:
                delete_file(user.avatar)

        user = UserSchema(
            email=email,
            full_name=full_name,
            phone_number=phone_number,
            password=user.password,
            avatar=avatar_info.path if avatar.filename else user.avatar,
            is_superuser=is_superuser,
            is_staff=is_staff,
            is_teacher=is_teacher,
            is_active=is_active
        )
        
        update_user_by_superuser_db(user_id, user, db)
        return db.query(UserModel).filter(
            UserModel.id == user_id,
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