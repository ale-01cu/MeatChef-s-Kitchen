from sqlalchemy import Column, String
from settings.db import Base
from sqlalchemy.orm import relationship
import uuid

class Category(Base):
    __tablename__ = 'categorys'

    id = Column(
        String, 
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    name = Column(
        String,
        unique=True,
        nullable=False,
        comment='Nombre de la categoria'
    )

    meat_product = relationship(
        'MeatProduct',
        back_populates='category'
    )
