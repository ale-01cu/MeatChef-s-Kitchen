from pydantic import BaseModel
from datetime import datetime
from app.schemas.user import UserSchema

class CustomOrderCreateSchema(BaseModel):
    payment_method: str
    delivery_type: str
    description: str


class CustomOrderSchema(CustomOrderCreateSchema):
    id: str
    user: UserSchema
    status: str
    amount: int
    createAt: datetime


class CustomOrderListSchema(BaseModel):
    id: str
    delivery_type: str
    payment_method: str
    status: str
    createAt: datetime