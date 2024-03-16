from sqlalchemy import (
    Column,
    ForeignKey,
    Text,
    Integer,
    String
)
from app.models.order import Order

class CustomOrder(Order):
    __tablename__ = 'custom_orders'
   
    id = Column(
        String, 
        ForeignKey('orders.id'), 
        primary_key=True
    )

    description = Column(
        Text,
        comment='Descripcion'
    )

    amount = Column(
        Integer,
        default=0,
        comment='Cantidad de unidades a pedir.'
    )

