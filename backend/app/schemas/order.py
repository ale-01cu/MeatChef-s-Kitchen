from pydantic import BaseModel
from datetime import date
from app.schemas.meat_product import MeatProduct
from app.schemas.user import UserSchema
from typing import Optional
from datetime import datetime

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
    address: Optional[str] = None
    order_items: list[OrderItemInputSchema]

class OrderListSchema(BaseModel):
    id: str
    delivery_type: str
    payment_method: str
    status: str
    createAt: datetime


class OrderSchema(OrderListSchema):
    address: Optional[str] = None
    total_price: float
    amount: int
    order_items: list[OrderItemSchema]


class OrderUpdateStatusSchema(BaseModel):
    status: str

class OrderStatusSchema(BaseModel):
    status: str

class OrderDeliverySchema(BaseModel):
    type: str

class OrderPaymentSchema(BaseModel):
    method: str



