from sqlalchemy.orm import Session
from app.models.meat_product import MeatProduct
from app.schemas.meat_product import MeatProductCreate

def list_meat_products_db(
    db: Session, 
    skip: int = 0,
    limit: int = 100 
) -> list[MeatProduct]:
    return db.query(MeatProduct).filter(
        MeatProduct.is_active == True).offset(skip).limit(limit).all()


def get_meat_product_by_id(
    db: Session, 
    id: str
) -> MeatProduct:
    return db.query(MeatProduct).filter(
        MeatProduct.id == id, 
        MeatProduct.is_active == True).first()


def create_meat_product(
    db: Session, 
    meat_product: MeatProductCreate = None,
) -> MeatProduct: 
    db_meat_product = MeatProduct(**meat_product.dict())
    db.add(db_meat_product)
    db.commit()
    return db_meat_product


def update_meat_product_db(
    db: Session,
    product_id: str,
    meat_product: MeatProductCreate,
) -> MeatProduct:
    meat_product = db.query(MeatProduct).filter(
        MeatProduct.id == product_id
    ).update(meat_product.dict())
    db.commit()
    return db.query(MeatProduct).filter(
        MeatProduct.id == product_id).first()


def delete_meat_product_by_id(
    db: Session, 
    id: str = ''
) -> None:
    meat_product = db.query(MeatProduct).filter(
        MeatProduct.id == id).first()
    meat_product.is_active = False
    db.commit()