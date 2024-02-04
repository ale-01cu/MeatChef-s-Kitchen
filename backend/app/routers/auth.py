from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user import UserLogin, UserCreateSchema
from app.schemas.token import Token, TokenInput, TokenIsValid
from settings.db import get_db
from app.models.userCRUD import create_user, get_user_by_email
from app.utils.password import get_password_hash, verify_password
from datetime import timedelta
from settings.base import ACCESS_TOKEN_EXPIRE_MINUTES
from app.utils.token import create_access_token
from app.utils.token import verify_token
from jose import JWTError
router = APIRouter()

@router.post('/register', tags={'register'})
async def register(
    user: UserCreateSchema, db: Session = Depends(get_db)
) -> UserCreateSchema:
    try:
        foundEmail = get_user_by_email(db, user.email)
        if foundEmail: 
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El email ya esta en uso.",
            )

        password_hashed = get_password_hash(user.password)
        user.password = password_hashed
        new_user = create_user(db, user)
        return new_user
    
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
async def login(
    user: UserLogin, db: Session = Depends(get_db)
):
    try:

        userFound = get_user_by_email(db, user.email)
        if not userFound:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No existe un usuario con ese email.",
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
    

@router.post('/verify-token', tags=['verify-token'])
async def verify_token(token: TokenInput) -> TokenIsValid:
    try:
        verify_token(token)
        return TokenIsValid(is_valid=True)
    except JWTError:
        return TokenIsValid(is_valid=False)