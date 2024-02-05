from sqlalchemy import Column, String
from settings.db import Base
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
        nullable=False,
        comment='Nombre de la categoria'
    )

