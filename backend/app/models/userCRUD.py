from sqlalchemy.orm import Session
from app.models.user import UserModel
from app.schemas.user import UserBaseSchema, UserCreateSchema


def get_user(db: Session, user_id: str):
    return db.query(UserModel).filter(UserModel.id == user_id).first()


def get_user_by_email(db: Session, email: str) -> UserCreateSchema:
    return db.query(UserModel).filter(
        UserModel.email == email, UserModel.is_active == True).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(UserModel).filter(
        UserModel.is_active == True).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreateSchema):
    db_user = UserModel(
        email=user.email, 
        full_name=user.full_name,
        password=user.password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user: UserBaseSchema):
    user = db.query(UserModel).filter(UserModel.id == user).first()
    user.is_active = False
    db.commit()

# def get_items(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(UserModel).offset(skip).limit(limit).all()


# def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
#     db_item = models.Item(**item.dict(), owner_id=user_id)
#     db.add(db_item)
#     db.commit()
#     db.refresh(db_item)
#     return db_item