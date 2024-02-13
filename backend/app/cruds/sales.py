from sqlalchemy.orm import Session
from app.models.order import Order, OrderItem, Statuslist
from app.schemas.order import OrderSchema, OrderListSchema, OrderInputSchema

def list_sales_db(db: Session, skip: int = 0, limit: int = 100 
) -> list[OrderListSchema]:
    return db\
        .query(Order)\
        .filter(
            Order.status == Statuslist.COMPLETED,
            Order.is_active == True)\
        .offset(skip).limit(limit).all()