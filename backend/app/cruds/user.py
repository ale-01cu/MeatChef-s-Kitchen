from sqlalchemy.orm import Session
from app.models.user import UserModel
from app.schemas.user import (
    UserBaseSchema, 
    UserCreateSchema, 
    UserSchema, 
    UserUpdate  
)


def get_user_by_id(db: Session, user_id: str) -> UserCreateSchema:
    user = db.query(UserModel).filter(
        UserModel.id == user_id,
        UserModel.is_active == True
    ).first()
    return user


def get_user_by_email(db: Session, email: str) -> UserCreateSchema:
    return db.query(UserModel).filter(
        UserModel.email == email, UserModel.is_active == True).first()

def get_user_by_phone_number(db: Session, phone_number: str) -> UserCreateSchema:
    return db.query(UserModel).filter(
        UserModel.phone_number == phone_number, 
        UserModel.is_active == True).first()

def get_user_by_full_name(db: Session, full_name: str) -> list[UserSchema]:
    return db.query(UserModel).filter(
        UserModel.full_name.ilike(f"%{full_name}%"), 
        UserModel.is_active == True
    ).all()


def list_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(UserModel).filter(
        UserModel.is_active == True).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreateSchema) -> UserSchema:
    db_user = UserModel(
        email=user.email, 
        full_name=user.full_name,
        phone_number=user.phone_number,
        password=user.password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user: UserUpdate) -> None:
    db.query(UserModel)\
    .filter(UserModel.id == user.id)\
    .update(values={
        UserModel.email: user.email,
        UserModel.full_name: user.full_name,
        UserModel.phone_number: user.phone_number
    })

    db.commit()
    db.refresh()


def delete_user(db: Session, user_id: str) -> None:
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    user.is_active = False
    db.commit()
    db.refresh()


# def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
#     db_item = models.Item(**item.dict(), owner_id=user_id)
#     db.add(db_item)
#     db.commit()
#     db.refresh(db_item)
#     return db_item