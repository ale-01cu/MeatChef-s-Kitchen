from sqlalchemy.orm import Session
from app.models.customOrder import CustomOrder
from app.schemas.custom_order import (
    CustomOrderCreateSchema, CustomOrderSchema,
    CustomOrderListSchema
)


def list_custom_order_db(db: Session, skip: int = 0, limit: int = 100 
) -> list[CustomOrderListSchema]:
    return db\
        .query(CustomOrder)\
        .filter(CustomOrder.is_active == True)\
        .offset(skip).limit(limit).all()


def list_custom_order_by_user_db(db: Session, user_id: str, skip: int = 0, limit: int = 100 
) -> list[CustomOrderListSchema]:
    return db\
        .query(CustomOrder)\
        .filter(
            CustomOrder.user_id == user_id,
            CustomOrder.is_active == True)\
        .offset(skip).limit(limit).all()

def create_custom_order_db(db: Session, custom_order: CustomOrderCreateSchema, user_id: str
) -> None:
    new_order = CustomOrder(**custom_order.model_dump(), user_id=user_id)
    db.add(new_order)
    db.commit()
