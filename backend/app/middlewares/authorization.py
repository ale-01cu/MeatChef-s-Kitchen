from fastapi import Request, HTTPException, status, Depends
from app.utils.token import verify_token
from app.models.userCRUD import get_user_by_email
from sqlalchemy.orm import Session
from settings.db import get_db

def authorization(request: Request, db: Session = Depends(get_db)):
    try:
        if 'authorization' in request.headers.keys():
            token: str = request.headers['authorization'].split('bearer ')[1]
            if not token: raise Exception() 
            payload = verify_token(token)
            email = payload['sub']
            user = get_user_by_email(db, email)
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail='Usuario no encontrado.'
                )
            return user
        
    except HTTPException as e:
        print(e)
        raise e

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Necesita Autorizacion.'
        )
