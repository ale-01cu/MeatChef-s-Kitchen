from sqlalchemy import Column, String, Text, Float, Boolean, Date, ForeignKey
from sqlalchemy.orm import relationship
from settings.db import Base
import uuid
from datetime import datetime

class MeatProduct(Base):
    __tablename__ = 'meat_products'

    id = Column(
        String, 
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    type_of_meat = Column(
        String,
        nullable=False,
        comment='Tipo de carne'
    )

    name_of_the_cut_of_meat = Column(
        String,
        unique=True,
        index=True,
        nullable=False,
        comment='Nombre del corte de carne'
    )

    description = Column(
        Text,
        comment='Descripcion del corte'
    )

    price = Column(
        Float,
        nullable=False,
        comment='Precio'
    )

    photo = Column(
        String,
        comment='Foto del producto'
    )

    category = Column(
        ForeignKey('categorys.id', ondelete='SET DEFAULT'),
        default='',
        comment='Categoria'
    )

    order_item = relationship(
        "OrderItem", 
        back_populates="meat_product"
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