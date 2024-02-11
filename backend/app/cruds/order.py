from sqlalchemy.orm import Session
from app.models.order import Order, OrderItem
from app.schemas.order import OrderSchema, OrderListSchema, OrderInputSchema

def list_order_db(db: Session, skip: int = 0, limit: int = 100 
) -> list[OrderListSchema]:
    return db\
        .query(Order)\
        .filter(Order.is_active == True)\
        .offset(skip).limit(limit).all()


def get_order_by_id(db: Session, id: str) -> OrderSchema:
    return db\
        .query(Order)\
        .filter(Order.id == id, Order.is_active == True)\
        .first()


def create_order_db(db: Session, order: OrderInputSchema, user_id: str
) -> list[OrderSchema]:
    order_items = order.order_items.copy()
    del order.order_items
    new_order = Order(**order.model_dump(), user_id=user_id)
    db.add(new_order)
    db.commit()

    for item in order_items:
        new_order_item = OrderItem(**item.model_dump(), order_id=new_order.id)
        print(new_order_item)
        db.add(new_order_item)
        db.commit()

    return db\
        .query(Order)\
        .filter(Order.id == new_order.id)\
        .first()


def update_order_db(db: Session, order_id: str, order: OrderSchema,
) -> OrderSchema:
    for i, item in enumerate(order.order_items):
        db.query(OrderItem)\
        .filter(OrderItem.id == item.id)\
        .update(**item.model_dump())
        db.commit()

    db.query(Order)\
    .filter(Order.id == order_id, Order.is_active == True)\
    .update(**order.model_dump())
    db.commit()

    return db.query(Order)\
        .filter(Order.id == order_id)\
        .first()


def update_order_status_db(db: Session, order_id: str, status: str
) -> OrderSchema:
    db.query(Order)\
        .filter(Order.id == order_id)\
        .update({'status': status})
    db.commit()

    return db.query(Order)\
        .filter(Order.id == order_id)\
        .first()


def delete_order_by_id(db: Session, order_id: str) -> None:
    order = db.query(Order)\
    .filter(Order.id == order_id).first()
    order.is_active = False
    db.commit()