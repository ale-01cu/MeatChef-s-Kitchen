from sqlalchemy.orm import Session
from app.models.meat_product import MeatProduct
from fastapi import Depends
from settings.db import get_db
from app.schemas.meat_product import MeatProductCreate

def list_meat_products(
    db: Session = Depends(get_db), 
    skip: int = 0,
    limit: int = 100 
):
    return db.query(MeatProduct).filter(
        MeatProduct.is_active == True).offset(skip).limit(limit).all()


def get_meat_product_by_id(db: Session = Depends(get_db), id: str = ''):
    return db.query(MeatProduct).filter(
        MeatProduct.id == id, 
        MeatProduct.is_active == True).first()


def create_meat_product(
    db: Session = Depends(get_db), 
    meat_product: MeatProductCreate = None,
): 
    db_meat_product = MeatProduct(meat_product)
    db.add(db_meat_product)
    db.commit()
    return db_meat_product


def update_meat_product(
    db: Session = Depends(get_db), 
    meat_product: MeatProductCreate = None
):
    meat_product = db.query(MeatProduct).filter(
        MeatProduct.id == meat_product.id
    ).update(meat_product.dict())
    db.commit()
    return db.query(MeatProduct).filter(
        MeatProduct.id == meat_product.id).first()


def delete_meat_product_by_id(
    db: Session = Depends(get_db), 
    id: str = ''
):
    meat_product = db.query(MeatProduct).filter(MeatProduct.id == id).first()
    meat_product.is_active = False
    db.commit()