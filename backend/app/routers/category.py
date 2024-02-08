from fastapi import APIRouter, Depends, HTTPException, status
from app.cruds.category import (
    create_category_db,
    list_categorys_db,
    get_category_by_id,
    update_category_db,
    delete_category_by_id
)
from app.schemas.category import CategoryCreate, CategorySchema
from sqlalchemy.orm import Session
from settings.db import get_db

router = APIRouter()

@router.get('/category', tags=['list-category'])
def list_categorys(db: Session = Depends(get_db)) -> list[CategorySchema]:
    try:

        category = list_categorys_db(db)
        return category

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo listar las categorias.'
        )
    

@router.get('/category/{category_id}', tags=['get-category'])
def get_category(
    category_id: str,
    db: Session = Depends(get_db)
) -> CategorySchema:
    try:

        category = get_category_by_id(db, category_id)
        return category

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo devolver la categoria.'
        )


@router.post('/category', tags=['create-category'])
async def create_category(
    category: CategoryCreate,
    db: Session = Depends(get_db), 

) -> CategorySchema:
    try:

        category = create_category_db(db, category)
        return category

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo crear la nueva categoria.'
        )
    

@router.put('/category/{category_id}', tags=['update-category'])
def update_category(
    category_id: str,
    category: CategoryCreate,
    db: Session = Depends(get_db), 
) -> CategorySchema:
    try:

        category = update_category_db(db, category_id, category)
        return category

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo actualizar la categoria.'
        )
    


@router.delete(
    '/category/{category_id}', 
    tags=['delete-category'], 
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_category(
    category_id: str,
    db: Session = Depends(get_db)
) -> None:
    try:

        if not get_category_by_id(db, category_id): return None
        delete_category_by_id(db, category_id)
        if get_category_by_id(db, category_id):
            raise Exception()
        return None

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo eliminar la categoria.'
        )
    