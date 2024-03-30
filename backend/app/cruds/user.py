from sqlalchemy.orm import Session
from app.models.user import UserModel
from app.schemas.user import (
    UserCreateSchema, 
    UserSchema, 
    UserUpdate,
    UserFull
)


def get_user_by_id(db: Session, user_id: str) -> UserFull:
    user = db.query(UserModel).filter(
        UserModel.id == user_id,
        UserModel.is_active == True
    ).first()
    return user

def get_user_by_admin_by_id(db: Session, user_id: str) -> UserFull:
    user = db.query(UserModel).filter(
        UserModel.id == user_id,
    ).first()
    return user

def get_user_by_email(db: Session, email: str) -> UserCreateSchema:
    user = db.query(UserModel).filter(
        UserModel.email == email, UserModel.is_active == True).first()
    db.close()
    return user
        


def get_user_by_phone_number(db: Session, phone_number: str) -> UserCreateSchema:
    return db.query(UserModel).filter(
        UserModel.phone_number == phone_number, 
    ).first()


def get_user_by_full_name(db: Session, full_name: str) -> list[UserSchema]:
    return db.query(UserModel).filter(
        UserModel.full_name.ilike(f"%{full_name}%"), 
        UserModel.is_active == True
    ).all()


def list_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(UserModel).offset(skip).limit(limit).all()


def create_user_db(db: Session, user: UserCreateSchema) -> UserSchema:
    db_user = UserModel(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(user_id: str, user: UserUpdate, db: Session) -> None:
    db.query(UserModel)\
        .filter(
            UserModel.id == user_id,
            UserModel.is_active == True)\
        .update(**user.model_dump())

    db.commit()

def update_avatar_db(user_id: str, avatar: str, db: Session) -> None:
    db.query(UserModel)\
        .filter(
            UserModel.id == user_id,
            UserModel.is_active == True)\
        .update({ 'avatar': avatar })

    db.commit()


def update_user_by_superuser_db(user_id: str, user: UserFull, db: Session) -> None:
    db.query(UserModel)\
        .filter(UserModel.id == user_id)\
        .update(values=user.model_dump())
    db.commit()


def delete_user_by_id(db: Session, user_id: str) -> None:
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    user.is_active = False
    db.commit()


# def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
#     db_item = models.Item(**item.dict(), owner_id=user_id)
#     db.add(db_item)
#     db.commit()
#     db.refresh(db_item)
#     return db_item