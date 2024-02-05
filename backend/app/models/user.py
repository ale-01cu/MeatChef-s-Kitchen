from sqlalchemy import Boolean, Column, String, Date
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
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, default='')
    password = Column(String, nullable=False)
    avatar = Column(String, default='')
    phone_number = Column(String, nullable=False, unique=True)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    is_staff = Column(Boolean, default=False)
    is_teacher = Column(Boolean, default=False)
    createAt = Column(Date, default=datetime.utcnow)
