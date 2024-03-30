from settings.db import Base
from sqlalchemy import Column, String, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

class Course(Base):
    __tablename__ = 'courses'

    id = Column(
        String, 
        primary_key=True, 
        default=lambda: str(uuid.uuid4())
    )

    name = Column(
        String, 
        default='',
        unique=True,
        index=True,
        nullable=False
    )

    description = Column(
        Text,
        comment='Descripcion del curso'
    )


    teacher_id = Column(
        ForeignKey('users.id', ondelete='SET DEFAULT'),
        default='',
        comment='Profesor'
    )

    teacher = relationship(
        'UserModel',
        back_populates='course',
    )

    photo = Column(
        String,
        comment='Foto del curso'
    )

    video = Column(
        String,
        comment='Video del curso'
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