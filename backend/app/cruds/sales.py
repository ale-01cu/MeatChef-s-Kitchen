from sqlalchemy.orm import Session
from sqlalchemy import and_, func
from app.models.standard_order import StandardOrder, StandardOrderItem
from app.models.order import Statuslist
from app.schemas.standard_order import StandardOrderListSchema
from app.schemas.meat_product import MeatProductList
from app.models.meat_product import MeatProduct
from app.schemas.user import UserListSchema
from app.models.user import UserModel
from app.schemas.sales import BiggerBuyersSchema

def list_sales_db(db: Session, skip: int = 0, limit: int = 100 
) -> list[StandardOrderListSchema]:
    return db\
        .query(StandardOrder)\
        .filter(
            StandardOrder.status == Statuslist.COMPLETED,
            StandardOrder.is_active == True)\
        .offset(skip).limit(limit).all()
    

def get_most_selled_products_db(db: Session, skip: int = 0, limit: int = 100) -> MeatProductList:
    orders = db.query(
            StandardOrderItem.meat_product_id, 
            func.count(StandardOrderItem.meat_product_id), 
            func.sum(StandardOrderItem.amount))\
        .join(
            StandardOrder, 
            and_(StandardOrder.id == StandardOrderItem.order_id, 
            StandardOrder.status == Statuslist.COMPLETED))\
        .group_by(StandardOrderItem.meat_product_id)\
        .order_by(
            func.count(StandardOrderItem.meat_product_id).desc(), 
            func.sum(StandardOrderItem.amount).desc())\
        .first()

    most_selled_product_id, count, total_amount = orders

    return db.query(MeatProduct).filter(MeatProduct.id == most_selled_product_id).first()

def list_biggest_buyers__db(db: Session, skip: int = 0, limit: int = 5) -> list[BiggerBuyersSchema]:
    users = db.query(UserModel, func.sum(StandardOrderItem.amount).label('total_amount'))\
        .join(StandardOrder, UserModel.id == StandardOrder.user_id)\
        .join(StandardOrderItem, StandardOrder.id == StandardOrderItem.order_id)\
        .group_by(UserModel.id)\
        .order_by(func.sum(StandardOrderItem.amount).desc())\
        .limit(limit)\
        .all()

    return [{ 'user': i[0], 'total_amount': i[1] } for i in users]