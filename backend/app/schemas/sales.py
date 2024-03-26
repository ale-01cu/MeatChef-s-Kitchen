from app.schemas.user import UserSchema
from app.schemas.meat_product import MeatProduct
from pydantic import BaseModel
from app.schemas.standard_order import StandardOrderSchema
from app.schemas.user import UserFull


class SalesSchema(BaseModel):
    orders: list[StandardOrderSchema]


class BiggerBuyersSchema(BaseModel):
    user: UserFull
    total_amount: int