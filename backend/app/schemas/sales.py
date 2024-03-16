from app.schemas.user import UserSchema
from app.schemas.meat_product import MeatProduct
from pydantic import BaseModel
from app.schemas.standard_order import StandardOrderSchema


class SalesSchema(BaseModel):
    orders: list[StandardOrderSchema]