from fastapi import Request, HTTPException, status, Depends
from app.utils.token import verify_token
from app.cruds.user import get_user_by_email
from sqlalchemy.orm import Session
from settings.db import get_db
from app.schemas.user import UserSchema

def get_user(request: Request, db: Session = Depends(get_db)
) -> UserSchema | None:

    try:
        if 'authorization' in request.headers.keys():
            token: str = request.headers['authorization'].split('bearer ')[1]
            if not token: return None
            payload = verify_token(token)
            email = payload['sub']
            user = get_user_by_email(db, email)
            if not user: return None
            return user
        
        return None
        
    except Exception as e:
        print(e)