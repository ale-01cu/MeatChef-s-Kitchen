from fastapi import (
    APIRouter, Depends, 
    HTTPException, status,
    UploadFile, File, Form    
)
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
from app.utils.save_file import save_file
from app.errors.SaveFileException import SaveFileException
from typing import Optional
from app.middlewares import role_permisisons
from psycopg2.errors import UniqueViolation
from app.utils.delete_file import delete_file

router = APIRouter()

@router.get('/meat-products', tags=['list-meat-products'])
async def list_meat_products(db: Session = Depends(get_db)
) -> list[MeatProduct]:
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
async def get_meat_products(product_id: str, db: Session = Depends(get_db)
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
    


@router.post('/meat-products', tags=['create-meat-product'],
    dependencies=[Depends(role_permisisons.if_is_staff)])
async def create_meat_products(
    type_of_meat: str = Form(),
    name_of_the_cut_of_meat: str = Form(),
    description: str = Form(),
    price: float = Form(),
    photo: Optional[UploadFile] = File(None),
    category: str = Form(),
    is_active: bool = Form(),
    db: Session = Depends(get_db)
) -> MeatProduct:
    try:

        file_info = await save_file(
            photo, 
            f'media/meat-products/{name_of_the_cut_of_meat}',
        )
        meat_product = MeatProductCreate(
            type_of_meat=type_of_meat,
            name_of_the_cut_of_meat=name_of_the_cut_of_meat,
            description=description,
            price=price,
            photo=file_info.path,
            category=category,
            is_active=is_active
        )
        products = create_meat_product(db, meat_product)
        return products
    
    except UniqueViolation as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Ya existe un producto con el mismo nombre.'
        )
    
    except SaveFileException as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Error al guardar el fichero.'
        )

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo crear un nuevo producto carnico.'
        )
    

@router.put('/meat-products/{product_id}', tags=['update-meat-product'],
    dependencies=[Depends(role_permisisons.if_is_staff)])
async def update_meat_products(
    product_id: str,
    type_of_meat: str = Form(),
    name_of_the_cut_of_meat: str = Form(),
    description: str = Form(),
    price: float = Form(),
    photo: UploadFile = File(),
    category: str = Form(),
    is_active: bool = Form(),
    db: Session = Depends(get_db)
) -> MeatProduct:
    try:
        # Comprueba si existe ya la foto
        # y si existe los elimina
        product = get_meat_product_by_id(db, product_id)
        path = f'media/meat-products/{name_of_the_cut_of_meat}'
        file_info = await save_file(photo, path)
        if product.photo != file_info.path:
            delete_file(product.photo)

        meat_product = MeatProductCreate(
            type_of_meat=type_of_meat,
            name_of_the_cut_of_meat=name_of_the_cut_of_meat,
            description=description,
            price=price,
            photo=file_info.path,
            category=category,
            is_active=is_active
        )
        product = update_meat_product_db(db, product_id, meat_product)
        return product
    
    except UniqueViolation as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Ya existe un producto con el mismo nombre.'
        )
    
    except SaveFileException as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Error al guardar el fichero.'
        )

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo actualizar el producto carnico.'
        )
    

@router.delete('/meat-products/{product_id}', tags=['delete-meat-product'], 
    dependencies=[Depends(role_permisisons.if_is_superuser)],
    status_code=status.HTTP_204_NO_CONTENT)
async def delete_meat_products(product_id: str, db: Session = Depends(get_db)
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
    

