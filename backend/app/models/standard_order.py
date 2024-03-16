from sqlalchemy import (
    Column, String, 
    ForeignKey, Integer,
)
from sqlalchemy.orm import relationship
from settings.db import Base
import uuid
from app.models.order import Order


class StandardOrder(Order):
    __tablename__ = 'standard_orders'

    id = Column(
        String, 
        ForeignKey('orders.id'), 
        primary_key=True
    )

    standard_order_items = relationship(
        "StandardOrderItem", 
        back_populates="standard_orders"
    )

    @property
    def amount(self) -> int:
        return sum(
            item.amount 
            for item in self.order_items
        )
    
    @property
    def total_price(self) -> float:
        total: float = 0.0
        for item in self.order_items:
            total += item.meat_product.price * item.amount
        return total



class StandardOrderItem(Base):
    __tablename__ = 'standard_order_items'

    id = Column(
        String, 
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )


    meat_product_id = Column(
        ForeignKey('meat_products.id', ondelete='SET DEFAULT'),
        default='',
        comment='Producto de la orden.'
    )

    meat_product = relationship(
        "MeatProduct", 
        back_populates="standard_order_items"
    )


    order_id = Column(
        ForeignKey('standard_orders.id', ondelete='SET DEFAULT'),
        default='',
        comment='La Orden.'
    )

    standard_orders = relationship(
        "StandardOrder", 
        back_populates="standard_order_items"
    )

    amount = Column(
        Integer,
        default=0,
        comment='Cantidad de unidades a pedir.'
    )