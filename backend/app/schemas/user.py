from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from typing import Optional
from dataclasses import field

class UserBaseSchema(BaseModel):
    id: str

class UserFullNameSchema(BaseModel):
    full_name: str

class UserCreateSchema(BaseModel):
    email: EmailStr = Field(min_length=12, max_length=50)
    full_name: str = Field(min_length=12, max_length=50)
    phone_number: str = Field(min_length=8, max_length=10)
    password: str = Field(min_length=6, max_length=25)


class UserSchema(UserBaseSchema):
    email: str
    full_name: str
    phone_number: str
    avatar: str

class UserUpdate(BaseModel):
    email: str
    full_name: str
    phone_number: str

class UserLogin(BaseModel):
    email: str
    password: str


class UserFull(BaseModel):
    id: str
    email: str
    full_name: str
    phone_number: str
    avatar: str
    is_superuser: bool
    is_staff: bool
    is_teacher: bool

class UserListSchema(UserFull):
    is_active: bool
    createAt: datetime

class UserSchema(UserFull):
    email: str
    full_name: str
    phone_number: str
    avatar: str
    is_superuser: Optional[bool] = False
    is_staff: Optional[bool] = False
    is_teacher: Optional[bool] = False
    is_active: bool
    password: str