from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user import UserLogin, UserCreateSchema
from app.schemas.token import Token, TokenIsValid
from settings.db import get_db
from app.cruds.user import (
    create_user_db, 
    get_user_by_email, 
    get_user_by_phone_number
)
from app.utils.password import hash_password, verify_password
from datetime import timedelta
from settings.base import ACCESS_TOKEN_EXPIRE_MINUTES
from app.utils.token import create_access_token, verify_token
from app.utils.token import get_token_within_bearer
router = APIRouter()

@router.post('/register', tags={'register'},
    status_code=status.HTTP_201_CREATED,)
async def register(user: UserCreateSchema, db: Session = Depends(get_db)
) -> None:
    try:
        foundEmail = get_user_by_email(db, user.email)
        if foundEmail: 
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El email ya esta en uso.",
            )
        
        found_phone_number = get_user_by_phone_number(db, user.phone_number)
        if found_phone_number:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El numero de telefono ya esta en uso.",
            )

        hashed_password = hash_password(user.password)
        user.password = hashed_password
        create_user_db(db, user)
    
    except HTTPException as e:
        print(e)
        raise e
    
    except Exception as e:
        print(e) 

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="No se pudo registrar el usuario.",
        )


@router.post('/login', tags={'login'})
async def login(user: UserLogin, db: Session = Depends(get_db)
) -> Token:
    try:

        userFound = get_user_by_email(db, user.email)
        if not userFound:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Email o contraseña incorrecto.",
            )
        
        passwordSucess = verify_password(user.password, userFound.password)
        if not passwordSucess:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Email o contraseña incorrecto.",
            )
        
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.email}, 
            expires_delta=access_token_expires
        )

        return Token(access_token=access_token)
    
    except HTTPException as e:
        print(e)
        raise e
    
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="No se pudo loguear al usuario.",
        )
    

@router.get('/verify-token/{token}', tags=['verify-token'])
async def verify_token_controller(token: str) -> TokenIsValid:
    try:
        only_token = get_token_within_bearer(token)
        verify_token(only_token)
        return TokenIsValid(is_valid=True)
    except Exception as e:
        print(e)
        return TokenIsValid(is_valid=False)