from fastapi import APIRouter, Depends, HTTPException, status
from app.cruds.meat_product import (
    list_meat_products_db,
    create_meat_product,
    get_meat_product_by_id,
    delete_meat_product_by_id,
    update_meat_product_db
)
from settings.db import get_db
from sqlalchemy.orm import Session
from app.schemas.meat_product import MeatProduct, MeatProductCreate
router = APIRouter()

@router.get('/meat-products', tags=['list-meat-products'])
def list_meat_products(db: Session = Depends(get_db)) -> list[MeatProduct]:
    try:

        products = list_meat_products_db(db)
        return products

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo listar los productos carnicos.'
        )
    

@router.get('/meat-products/{product_id}', tags=['get-meat-product'])
def get_meat_products(
    product_id: str,
    db: Session = Depends(get_db)
) -> MeatProduct:
    try:

        product = get_meat_product_by_id(db, product_id)
        if not product: raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='El producto no existe.'
        )
        return product

    except HTTPException as e:
        print(e)
        raise e

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo devolver el producto carnico.'
        )
    


@router.post('/meat-products', tags=['create-meat-product'])
def create_meat_products(
    meat_product: MeatProductCreate,
    db: Session = Depends(get_db)
) -> MeatProduct:
    try:

        products = create_meat_product(db, meat_product)
        return products

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo crear un nuevo producto carnico.'
        )
    

@router.put('/meat-products/{product_id}', tags=['update-meat-product'])
def update_meat_products(
    product_id: str,
    meat_product: MeatProductCreate,
    db: Session = Depends(get_db)

) -> MeatProduct:
    try:

        product = update_meat_product_db(db, product_id, meat_product)
        return product

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo actualizar el producto carnico.'
        )
    

@router.delete(
    '/meat-products/{product_id}', 
    tags=['delete-meat-product'], 
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_meat_products(
    product_id: str,
    db: Session = Depends(get_db)
) -> None:
    try:

        if not get_meat_product_by_id(db, product_id): return None
        delete_meat_product_by_id(db, product_id)
        if get_meat_product_by_id(db, product_id):
            raise Exception()
        return None

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo eliminar el producto carnico.'
        )
    

