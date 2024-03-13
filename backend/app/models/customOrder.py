from settings.db import Base
from sqlalchemy import (
    Column,
    String,
    ForeignKey,
    Boolean,
    DateTime,
    Text,
    Integer
)
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

class CustomOrder(Base):
    __tablename__ = 'custom_orders'

    id = Column(
        String, 
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

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
        back_populates="custom_orders"
    )


    delivery_type = Column(
        String,
        comment='Tipo de entrega.'
    )


    payment_method = Column(
        String,
        comment='Metodo de pago.'
    )

    address = Column(
        String,
        comment='Direccion de envio',
        nullable=True
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

