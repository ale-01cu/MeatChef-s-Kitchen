from fastapi import (
    APIRouter, Depends, 
    HTTPException, status,
    UploadFile, File, Form    
)
from settings.db import get_db
from sqlalchemy.orm import Session
from app.utils.save_file import save_file
from app.middlewares import role_permisisons
from app.middlewares.authorization import authorization
from app.cruds.course import (
    create_course_db,
    delete_course_by_id,
    get_course_by_id,
    list_courses_db,
    update_course_db,
    list_course_by_name
)
from app.schemas.course import (
    CourseCreateSchema,
    CourseListSchema,
    CourseSchema,
    CourseUpdateSchema
)
from app.schemas.user import UserSchema
from psycopg2.errors import UniqueViolation
from app.errors.SaveFileException import SaveFileException
from fastapi.exceptions import ValidationException
from app.utils.delete_file import delete_file

router = APIRouter()

@router.get('/course', tags=['list-course'])
async def list_courses(db: Session = Depends(get_db)
) -> list[CourseListSchema]:
    try:

        courses = list_courses_db(db)
        return courses

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo listar los cursos.'
        )


@router.get('/course/search/{name}', tags=['search-course'])
async def search_courses(name: str, db: Session = Depends(get_db)
) -> list[CourseListSchema]:
    try:

        courses = list_course_by_name(db, name)
        return courses

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo listar los cursos.'
        )
    

@router.get('/course/{course_id}', tags=['get-course'])
async def get_course(course_id: str, db: Session = Depends(get_db)
) -> CourseSchema:
    try:

        course = get_course_by_id(db, course_id)
        if not course: raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='El curso no existe.'
        )
        return course

    except HTTPException as e:
        print(e)
        raise e

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo devolver el curso.'
        )
    

@router.post('/course', tags=['create-course'],
    dependencies=[Depends(role_permisisons.if_is_teacher)])
async def create_course(
    name: str = Form(),
    description: str = Form(),
    user: UserSchema = Depends(authorization),
    photo: UploadFile = File(),
    video: UploadFile = File(),
    is_active: bool = Form(),
    db: Session = Depends(get_db)
) -> CourseSchema:
    try:
        if list_course_by_name(db, name): raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Ya existe un curso con ese nombre.'
        )
        path = f'media/courses/{name}'
        photo_info = await save_file(photo, path)
        video_info = await save_file(video, path)

        course = CourseCreateSchema(
            name=name,
            description=description,
            teacher_id=user.id,
            photo=photo_info.path,
            video=video_info.path,
            is_active=is_active
        )
        course = create_course_db(db, course)
        return course
    
    except HTTPException as e:
        print(e)
        raise e
    
    except UniqueViolation as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Ya existe un curso con el mismo nombre.'
        )
    
    except SaveFileException as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Error al guardar el fichero.'
        )
    
    except ValidationException as e:
        print(e)
        raise e

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo crear un nuevo curso.'
        )
    

@router.put('/course/{course_id}', tags=['update-course'],
    dependencies=[Depends(role_permisisons.if_is_teacher)])
async def update_course(
    course_id: str,
    name: str = Form(),
    description: str = Form(),
    photo: UploadFile = File(),
    video: UploadFile = File(),
    db: Session = Depends(get_db)
) -> CourseSchema:
    try:

        # Comprueba si existe ya la foto o el video
        # y si existe los elimina
        if get_course_by_name(db, name):raise UniqueViolation()

        course = get_course_by_id(db, course_id)
        path = f'media/courses/{name}'
        photo_info = await save_file(photo, path)
        if course.photo != photo_info.path:
            delete_file(course.photo)
        video_info = await save_file(video, path)
        if course.video != video_info.path:
            delete_file(course.video)

        course = CourseUpdateSchema(
            name=name,
            description=description,
            photo=photo_info.path,
            video=video_info.path,
        )
        course = update_course_db(db, course_id, course)
        return course
    
    except UniqueViolation as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Ya existe un curso con el mismo nombre.'
        )
    
    except SaveFileException as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Error al guardar el fichero.'
        )
    
    except ValidationException as e:
        print(e)
        raise e

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo actualizar el curso.'
        )


    

@router.delete('/course/{course_id}', tags=['delete-course'], 
    dependencies=[Depends(role_permisisons.if_is_teacher)],
    status_code=status.HTTP_204_NO_CONTENT)
async def delete_course(course_id: str, db: Session = Depends(get_db)
) -> None:
    try:

        if not get_course_by_id(db, course_id): return None
        delete_course_by_id(db, course_id)
        if get_course_by_id(db, course_id):
            raise Exception()
        return None

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo eliminar el curso.'
        )
    


