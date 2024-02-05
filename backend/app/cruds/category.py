from sqlalchemy.orm import Session
from app.models.category import Category
from fastapi import Depends
from settings.db import get_db
from app.schemas.category import CategoryCreate

def list_categorys(
    db: Session = Depends(get_db), 
    skip: int = 0,
    limit: int = 100 
):
    return db.query(Category).offset(skip).limit(limit).all()


def get_category_by_id(db: Session = Depends(get_db), id: str = ''):
    return db.query(Category).filter(
        Category.id == id).first()


def create_category(
    db: Session = Depends(get_db), 
    category: CategoryCreate = None,
): 
    db_category = Category(category)
    db.add(db_category)
    db.commit()
    return db_category


def update_category(
    db: Session = Depends(get_db), 
    category: CategoryCreate = None
):
    db.query(Category).filter(
        Category.id == category.id
    ).update(category.dict())
    db.commit()
    return db.query(Category).filter(
        Category.id == category.id).first()


def delete_category_by_id(
    db: Session = Depends(get_db), 
    id: str = ''
):
    db.query(Category).filter(
        Category.id == id).delete(synchronize_session=False)
    db.commit()