from sqlalchemy import (
    Column, String, 
    Boolean, Date, 
    ForeignKey, Integer   
)
from sqlalchemy.orm import relationship
from settings.db import Base
import uuid
from datetime import datetime
from sqlalchemy.ext.hybrid import hybrid_property

class Order(Base):
    __tablename__ = 'orders'

    id = Column(
        String, 
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    class Statuslist:
        received = 'recivido'
        processing = 'procesando'
        delivery = 'enviado'
        complete = 'completo'
        cancelled = 'cancelado'

    class DeliveryType:
        picked_up = 'recogida'
        delivery = 'envio'

    class PaymentMethod:
        magnetic_card = 'targeta magnetica'
        cash = 'efectivo'

    status = Column(
        String,
        default='Recivido',
        comment='Estado del pedido.'
    )

    user_id = Column(
        ForeignKey('users.id', ondelete='SET DEFAULT'),
        default='',
        comment='Usuario que realizo la orden.'
    )

    user = relationship(
        "UserModel", 
        back_populates="order"
    )


    delivery_type = Column(
        String,
        comment='Tipo de entrega.'
    )


    payment_method = Column(
        String,
        comment='Metodo de pago.'
    )

    order_items = relationship(
        "OrderItem", 
        back_populates="order"
    )

    is_custom_order = Column(
        Boolean,
        default=False,
        comment='Pedido personalizado'
    )

    is_active = Column(
        Boolean,
        comment='Esta activo',
        default=True
    )

    createAt = Column(
        Date, 
        default=datetime.utcnow,
        comment='Fecha de creado'
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



class OrderItem(Base):
    __tablename__ = 'order_items'

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
        back_populates="order_item"
    )


    order_id = Column(
        ForeignKey('orders.id', ondelete='SET DEFAULT'),
        default='',
        comment='Usuario que realizo la orden.'
    )

    order = relationship(
        "Order", 
        back_populates="order_items"
    )

    amount = Column(
        Integer,
        default=0,
        comment='Cantidad de unidades a pedir.'
    )