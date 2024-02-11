from pydantic import BaseModel
from datetime import date
from app.schemas.meat_product import MeatProduct
from app.schemas.user import UserSchema

# Order Item
class OrderItemSchema(BaseModel):
    id: str
    meat_product: MeatProduct
    amount: int

class OrderItemInputSchema(BaseModel):
    meat_product_id: str
    amount: int

# Order
class OrderInputSchema(BaseModel):
    delivery_type: str
    payment_method: str
    is_custom_order: bool
    order_items: list[OrderItemInputSchema]

class OrderListSchema(BaseModel):
    id: str
    user: UserSchema
    status: str
    is_custom_order: bool
    createAt: date

class OrderSchema(OrderListSchema):
    payment_method: str
    delivery_type: str
    total_price: float
    amount: int
    order_items: list[OrderItemSchema]


class OrderUpdateStatusSchema(BaseModel):
    status: str



