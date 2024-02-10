from pydantic import BaseModel
from datetime import date

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

class CourseListSchema(BaseModel):
    id: str
    name: str
    description: str
    photo: str
    teacher_id: str
    createAt: date


class CourseSchema(BaseModel):
    id: str
    name: str
    description: str
    teacher_id: str
    photo: str
    video: str
    createAt: date