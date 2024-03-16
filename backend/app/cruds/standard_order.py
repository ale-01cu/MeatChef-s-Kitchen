from sqlalchemy.orm import Session
from app.models.standard_order import StandardOrderItem, StandardOrder
from app.schemas.standard_order import (
    StandardOrderSchema, 
    StandardOrderListSchema, 
    StandardOrderInputSchema
)
from app.models.order import Statuslist

def list_standard_order_db(db: Session, skip: int = 0, limit: int = 100 
) -> list[StandardOrderListSchema]:
    return db\
        .query(StandardOrder)\
        .filter(
            StandardOrder.status == Statuslist.RECEIVED,
        )\
        .offset(skip).limit(limit).all()


def list_processed_standard_order_db(db: Session, skip: int = 0, limit: int = 100 
) -> list[StandardOrderListSchema]:
    return db\
        .query(StandardOrder)\
        .offset(skip).limit(limit).all()


def list_standard_order_by_user_db(db: Session, user_id: str, skip: int = 0, limit: int = 100 
) -> list[StandardOrderListSchema]:
    return db\
        .query(StandardOrder)\
        .filter(
            StandardOrder.user_id == user_id,
            StandardOrder.is_active == True)\
        .offset(skip).limit(limit).all()



def get_standard_order_by_id(db: Session, id: str) -> StandardOrderSchema:
    return db\
        .query(StandardOrder)\
        .filter(StandardOrder.id == id, StandardOrder.is_active == True)\
        .first()


def create_standard_order_db(db: Session, order: StandardOrderInputSchema, user_id: str
) -> None:
    order_items = order.order_items.copy()
    del order.order_items
    new_order = StandardOrder(**order.model_dump(), user_id=user_id)
    db.add(new_order)
    db.commit()

    for item in order_items:
        new_order_item = StandardOrderItem(**item.model_dump(), order_id=new_order.id)
        db.add(new_order_item)
        db.commit()


def update_standard_order_db(db: Session, order_id: str, order: StandardOrderSchema,
) -> StandardOrderSchema:
    for i, item in enumerate(order.order_items):
        db.query(StandardOrderItem)\
        .filter(StandardOrderItem.id == item.id)\
        .update(**item.model_dump())
        db.commit()

    db.query(StandardOrder)\
    .filter(StandardOrder.id == order_id, StandardOrder.is_active == True)\
    .update(**order.model_dump())
    db.commit()

    return db.query(StandardOrder)\
        .filter(StandardOrder.id == order_id)\
        .first()


def update_standard_order_status_db(db: Session, order_id: str, status: str
) -> StandardOrderSchema:
    db.query(StandardOrder)\
        .filter(StandardOrder.id == order_id)\
        .update({'status': status})
    db.commit()

    return db.query(StandardOrder)\
        .filter(StandardOrder.id == order_id)\
        .first()


def delete_standard_order_by_id(db: Session, order_id: str) -> None:
    order = db.query(StandardOrder)\
    .filter(StandardOrder.id == order_id).first()
    order.is_active = False
    db.commit()