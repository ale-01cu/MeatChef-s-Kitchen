from sqlalchemy import (
    Column, String, 
    Boolean, 
    ForeignKey,
    DateTime,
)
from sqlalchemy.orm import relationship
from settings.db import Base
import uuid
from datetime import datetime

class Statuslist:
    RECEIVED = 'recivido'
    PROCESSED = 'procesado'
    DELIVERY = 'enviado'
    COMPLETED = 'completo'
    CANCELLED = 'cancelado'
    STATUS_LIST = [
        RECEIVED,
        PROCESSED,
        DELIVERY,
        COMPLETED,
        CANCELLED
    ]

class DeliveryType:
    PICKED_UP = 'recogida'
    DELIVERY = 'envio'
    DELIVERY_TYPE_LIST = [
        PICKED_UP,
        DELIVERY
    ]

class PaymentMethod:
    MAGNETIC_CARD = 'targeta_magnetica'
    CASH = 'efectivo'
    PAYMENT_METHOD_LIST = [
       MAGNETIC_CARD,
        CASH 
    ]

class Order(Base):
    __tablename__ = 'orders'

    id = Column(
        String, 
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    status = Column(
        String,
        default=Statuslist.RECEIVED,
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

    address = Column(
        String,
        comment='Direccion de envio',
        nullable=True
    )


    payment_method = Column(
        String,
        comment='Metodo de pago.'
    )


    is_active = Column(
        Boolean,
        comment='Esta activo',
        default=True
    )

    createAt = Column(
        DateTime, 
        default=datetime.utcnow,
        comment='Fecha de creado'
    )