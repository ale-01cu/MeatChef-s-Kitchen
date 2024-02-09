from sqlalchemy.orm import Session
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategorySchema

def list_categorys_db(db: Session, skip: int = 0, limit: int = 100 
) -> list[CategorySchema]:
    return db.query(Category).offset(skip).limit(limit).all()


def get_category_by_id(db: Session, id: str) -> CategorySchema:
    return db.query(Category).filter(
        Category.id == id).first()

def get_category_by_name(db: Session, name: str) -> CategorySchema:
    return db.query(Category).filter(
        Category.name == name).first()


def create_category_db(db: Session, category: CategoryCreate,
) -> CategorySchema: 
    db_category = Category(**category.model_dump())
    db.add(db_category)
    db.commit()
    return db_category


def update_category_db(db: Session, category_id: str, category: CategoryCreate
) -> CategorySchema:
    db.query(Category).filter(
        Category.id == category_id
    ).update(category.model_dump())
    db.commit()
    return db.query(Category).filter(
        Category.id == category_id).first()


def delete_category_by_id(db: Session, id: str) -> None:
    db.query(Category).filter(
        Category.id == id).delete(synchronize_session=False)
    db.commit()