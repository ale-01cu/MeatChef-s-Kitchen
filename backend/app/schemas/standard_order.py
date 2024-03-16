from pydantic import BaseModel
from datetime import date
from app.schemas.meat_product import MeatProduct
from typing import Optional
from datetime import datetime

# Order Item
class StandardOrderItemSchema(BaseModel):
    id: str
    meat_product: MeatProduct
    amount: int

class StandardOrderItemInputSchema(BaseModel):
    meat_product_id: str
    amount: int

# Order
class StandardOrderInputSchema(BaseModel):
    delivery_type: str
    payment_method: str
    address: Optional[str] = None
    order_items: list[StandardOrderItemInputSchema]

class StandardOrderListSchema(BaseModel):
    id: str
    delivery_type: str
    payment_method: str
    status: str
    standard_order_items: list[StandardOrderItemSchema]
    createAt: datetime


class StandardOrderSchema(StandardOrderListSchema):
    address: Optional[str] = None
    total_price: float
    amount: int


class StandardOrderStatusSchema(BaseModel):
    status: str

class StandardOrderDeliverySchema(BaseModel):
    type: str

class StandardOrderPaymentSchema(BaseModel):
    method: str



