from sqlalchemy.orm import Session
from app.models.meat_product import MeatProduct
from app.schemas.meat_product import MeatProductCreate
from app.models.category import Category
from sqlalchemy import text

def list_meat_products_db(db: Session, skip: int = 0, limit: int = 100 
) -> list[MeatProduct]:
    return db.query(MeatProduct).filter(
        MeatProduct.is_active == True
    )\
    .order_by(MeatProduct.createAt.desc())\
    .offset(skip).limit(limit).all()

def list_meat_products_admin_db(db: Session, skip: int = 0, limit: int = 100 
) -> list[MeatProduct]:
    return db.query(MeatProduct)\
    .order_by(MeatProduct.createAt.desc())\
    .offset(skip).limit(limit).all()


def get_meat_product_by_id(db: Session, id: str) -> MeatProduct:
    return db.query(MeatProduct).filter(
        MeatProduct.id == id, 
        MeatProduct.is_active == True).first()

def get_meat_product_admin_by_id(db: Session, id: str) -> MeatProduct:
    return db.query(MeatProduct).filter(
        MeatProduct.id == id, 
    ).first()

def get_meat_product_admin_by_name(db: Session, name: str) -> MeatProduct:
    return db.query(MeatProduct).filter(
        MeatProduct.name_of_the_cut_of_meat == name, 
    ).first()


def list_meat_product_by_name(db: Session, name: str, skip: int = 0, limit: int = 100
) -> list[MeatProduct]:
    return db.query(MeatProduct).filter(
        MeatProduct.name_of_the_cut_of_meat.ilike(f"%{name}%"), 
        MeatProduct.is_active == True
    )\
    .order_by(MeatProduct.createAt.desc())\
    .offset(skip).limit(limit).all()


def list_meat_product_admin_by_name(db: Session, name: str, skip: int = 0, limit: int = 100
) -> list[MeatProduct]:
    return db.query(MeatProduct).filter(
        MeatProduct.name_of_the_cut_of_meat.ilike(f"%{name}%"), 
    )\
    .order_by(MeatProduct.createAt.desc())\
    .offset(skip).limit(limit).all()


def list_meat_product_by_category(db: Session, cat: str, skip: int = 0, limit: int = 100
) -> list[MeatProduct]:
    return db.query(MeatProduct).filter(
        MeatProduct.category_id == cat, 
        MeatProduct.is_active == True
    )\
    .order_by(MeatProduct.createAt.desc())\
    .offset(skip).limit(limit).all()


def list_meat_product_admin_by_category(db: Session, cat: str, skip: int = 0, limit: int = 100
) -> list[MeatProduct]:
    return db.query(MeatProduct).filter(
        MeatProduct.category_id == cat, 
    )\
    .order_by(MeatProduct.createAt.desc())\
    .offset(skip).limit(limit).all()


def create_meat_product(db: Session, meat_product: MeatProductCreate,
) -> MeatProduct: 
    db_meat_product = MeatProduct(**meat_product.model_dump())
    db.add(db_meat_product)
    db.commit()
    return db_meat_product


def update_meat_product_db(db: Session, product_id: str, meat_product: MeatProductCreate,
) -> MeatProduct:
    db.query(MeatProduct).filter(
        MeatProduct.id == product_id
    ).update(meat_product.model_dump())
    db.commit()
    return db.query(MeatProduct).filter(
        MeatProduct.id == product_id).first()


def delete_meat_product_by_id(db: Session, id: str) -> None:
    meat_product = db.query(MeatProduct).filter(
        MeatProduct.id == id).first()
    meat_product.is_active = False
    db.commit()