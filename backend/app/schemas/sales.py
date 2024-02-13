from app.schemas.user import UserSchema
from app.schemas.meat_product import MeatProduct
from pydantic import BaseModel
from app.schemas.order import OrderSchema


class SalesSchema(BaseModel):
    orders: list[OrderSchema]