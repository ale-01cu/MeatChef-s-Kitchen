from sqlalchemy.orm import Session
from app.schemas.order import OrderUpdateStatusSchema
from app.models.order import Order


def update_order_list_status_db(
    db: Session, order_list: list[OrderUpdateStatusSchema]
) -> None:
    
    for order in order_list:
        db.query(Order)\
            .filter(Order.id == order.id)\
            .update({'status': order.status})
        db.commit()