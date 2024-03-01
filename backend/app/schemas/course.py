from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CourseCreateSchema(BaseModel):
    name: str
    description: str
    teacher_id: str
    photo: str
    video: str
    is_active: bool

class CourseUpdateSchema(BaseModel):
    name: str
    description: str
    photo: str
    video: str
    is_active: bool

class CourseUpdateWithinNameSchema(BaseModel):
    description: str
    photo: str
    video: str
    is_active: bool

class CourseListSchema(BaseModel):
    id: str
    name: str
    description: str
    photo: str
    teacher_id: str
    is_active: bool
    createAt: datetime


class CourseSchema(BaseModel):
    id: str
    name: str
    description: str
    teacher_id: str
    photo: str
    video: str
    is_active: bool
    createAt: datetime