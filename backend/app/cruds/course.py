from sqlalchemy.orm import Session
from app.models.course import Course
from app.schemas.course import (
    CourseCreateSchema,
    CourseSchema,
    CourseListSchema
)

def list_courses_db(db: Session, skip: int = 0, limit: int = 100 
) -> list[CourseListSchema]:
    return db.query(Course).filter(
        Course.is_active == True).offset(skip).limit(limit).all()


def get_course_by_id(db: Session, id: str) -> CourseSchema:
    return db.query(Course).filter(
        Course.id == id, 
        Course.is_active == True).first()


def get_course_by_name(db: Session, name: str) -> CourseSchema:
    return db.query(Course).filter(
        Course.name == name, 
    ).first()


def create_course_db(db: Session, course: CourseCreateSchema = None,
) -> CourseSchema: 
    db_course = Course(**course.model_dump())
    db.add(db_course)
    db.commit()
    return db_course


def update_course_db(db: Session, course_id: str, course: CourseCreateSchema,
) -> CourseSchema:
    db.query(Course).filter(
        Course.id == course_id
    ).update(course.model_dump())
    db.commit()
    return db.query(Course).filter(
        Course.id == course_id).first()


def delete_course_by_id(db: Session, id: str) -> None:
    course = db.query(Course).filter(
        Course.id == id).first()
    course.is_active = False
    db.commit()
