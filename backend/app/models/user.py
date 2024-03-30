from sqlalchemy import Boolean, Column, String, Date, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from settings.db import Base
import uuid

class UserModel(Base):
    __tablename__ = "users"

    id = Column(
        String, 
        primary_key=True, 
        default=lambda: str(uuid.uuid4())
    )

    email = Column(
        String, 
        unique=True, 
        index=True, 
        nullable=False,
    )
    
    full_name = Column(
        String, 
        default='',
        nullable=False
    )

    password = Column(
        String, 
        nullable=False
    )
    
    avatar = Column(
        String, 
        default=''
    )
        
    phone_number = Column(
        String, 
        nullable=False, 
        unique=True
    )

    order = relationship(
        'StandardOrder',
        back_populates='user'
    )

    custom_orders = relationship(
        'CustomOrder',
        back_populates='user'
    )
    
    course = relationship(
        'Course',
        back_populates='teacher'
    )

    is_active = Column(
        Boolean, 
        default=True,
        nullable=False,
        comment='Define si el usuaio esta eliminado o no.'
    )

    is_superuser = Column(
        Boolean, 
        default=False,
        nullable=False,
        comment='Para darle acceso total al usuario.'
    )

    is_staff = Column(
        Boolean, 
        default=False,
        nullable=False,
        comment='Para darle acceso parcial al usuario.'
    )

    is_teacher = Column(
        Boolean, 
        default=False,
        nullable=False,
        comment='Para darle acceso a crear cursos al usuario.'
    )
    
    createAt = Column(
        DateTime, 
        default=datetime.utcnow,
        comment='Fecha de registrado el usuario.'
    )
