from sqlalchemy.orm import Session
from app.models.standard_order import StandardOrder
from app.models.order import Statuslist
from app.schemas.standard_order import StandardOrderListSchema

def list_sales_db(db: Session, skip: int = 0, limit: int = 100 
) -> list[StandardOrderListSchema]:
    return db\
        .query(StandardOrder)\
        .filter(
            StandardOrder.status == Statuslist.COMPLETED,
            StandardOrder.is_active == True)\
        .offset(skip).limit(limit).all()