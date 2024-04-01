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
    update_meat_product_db,
    list_meat_product_by_name,
    list_meat_product_by_category,
    get_meat_product_admin_by_id,
    list_meat_product_admin_by_category,
    list_meat_product_admin_by_name,
    list_meat_products_admin_db,
    get_meat_product_admin_by_name
)
from settings.db import get_db
from sqlalchemy.orm import Session
from app.schemas.meat_product import (
    MeatProduct, MeatProductCreate, MeatProductList)
from app.utils.save_file import save_file
from app.errors.SaveFileException import SaveFileException
from typing import Optional
from app.middlewares import role_permisisons
from psycopg2.errors import UniqueViolation
from app.utils.delete_file import delete_file
from app.middlewares.getUser import get_user
from app.schemas.user import UserSchema

router = APIRouter()

# 1. Inicio
@router.get('/meat-products', tags=['list-meat-products'])
async def list_meat_products(db: Session = Depends(get_db),
    user: UserSchema | None = Depends(get_user)
) -> list[MeatProductList]:
    
    # 2. try
    try:

        # 4. if user: if user.is_superuser
        if user:
            if user.is_superuser: 
                # 5. return list_meat_products_admin_db(db)
                return list_meat_products_admin_db(db)
        # 6. list_meat_products_db(db)
        return list_meat_products_db(db)

    # 3. except Exception as e
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo listar los productos carnicos.'
        )
    # 7. Fin
    
@router.get('/meat-products-last', tags=['list-last-meat-products'])
async def list_last_meat_products(db: Session = Depends(get_db),
) -> list[MeatProductList]:
    try:
        products = list_meat_products_db(db, limit=4)
        return products

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo listar los productos carnicos.'
        )
    

@router.get('/meat-products/category/{category_id}', tags=['list-meat-products'])
async def list_meat_products_by_category(category_id: str, db: Session = Depends(get_db),
    user: UserSchema | None = Depends(get_user)
) -> list[MeatProduct]:
    try:

        if user:
            if user.is_staff or user.is_superuser:
                return list_meat_product_admin_by_category(db, category_id)
        products = list_meat_product_by_category(db, category_id)
        return products

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo listar los productos carnicos.'
        )
    

# 1. Inicio
@router.get('/meat-products/{product_id}', tags=['get-meat-product'])
async def get_meat_products(product_id: str, db: Session = Depends(get_db),
    user: UserSchema | None = Depends(get_user)
) -> MeatProduct:
    # 2. try
    try:

        # 5. if user: if user.is_superuser
        if user:
            if user.is_superuser:
                # 6. return get_meat_product_admin_by_id(db, product_id)
                return get_meat_product_admin_by_id(db, product_id)
        product = get_meat_product_by_id(db, product_id)
        # 7. if not product
        if not product: 
            # 8. raise HTTPException
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='El producto no existe.'
            )
        # 9. return product
        return product

    # 3. except HTTPException as e
    except HTTPException as e:
        print(e)
        raise e
    
    # 4. except Exception as e
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo devolver el producto carnico.'
        )
    # 10. Fin
    

@router.get('/meat-products/search/{product_name}', tags=['search-meat-product'])
async def search_meat_products(product_name: str, db: Session = Depends(get_db),
    user: UserSchema | None = Depends(get_user)
) -> list[MeatProduct]:
    try:

        if user:
            if user.is_staff:
                return list_meat_product_admin_by_name(db, product_name)
        product = list_meat_product_by_name(db, product_name)
        if not product: return []
        return product

    except HTTPException as e:
        print(e)
        raise e

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo devolver los resultados de la busqueda.'
        )


@router.post('/meat-products', tags=['create-meat-product'],
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(role_permisisons.if_is_staff)])
async def create_meat_products(
    type_of_meat: str = Form(),
    name_of_the_cut_of_meat: str = Form(),
    description: str = Form(),
    price: float = Form(),
    photo: Optional[UploadFile] = File(None),
    category_id: str = Form(),
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
            category_id=category_id,
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
    
# 1. Inicio
@router.put('/meat-products/{product_id}', tags=['update-meat-product'],
    dependencies=[Depends(role_permisisons.if_is_superuser)])
async def update_meat_products(
    product_id: str,
    type_of_meat: str = Form(),
    name_of_the_cut_of_meat: str = Form(),
    description: str = Form(),
    price: float = Form(),
    photo: UploadFile = File(),
    category_id: str = Form(),
    is_active: bool = Form(),
    db: Session = Depends(get_db)
) -> MeatProduct:
    # 2. try
    try:
        # Comprueba si existe ya la foto
        # y si existe los elimina
        product = get_meat_product_admin_by_id(db, product_id)

        # 6. if name_of_the_cut_of_meat != product.name_of_the_cut_of_meat
        if name_of_the_cut_of_meat != product.name_of_the_cut_of_meat:
            prod_found = get_meat_product_admin_by_name(db, name_of_the_cut_of_meat)
            # 7. if prod_found
            if prod_found: 
                # 8. raise HTTPException
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail='Ya existe un producto con ese nombre.'
                )

        # 9. if photo.filename
        if photo.filename:
            path = f'media/meat-products/{name_of_the_cut_of_meat}'
            file_info = await save_file(photo, path)
            # 10. if product.photo != file_info.path
            if product.photo != file_info.path:
                # 11. delete_file(product.photo)
                delete_file(product.photo)

        meat_product = MeatProductCreate(
            type_of_meat=type_of_meat,
            name_of_the_cut_of_meat=name_of_the_cut_of_meat,
            description=description,
            price=price,
            photo=file_info.path if photo.filename else product.photo,
            category_id=category_id,
            is_active=is_active
        )

        # 12. return update_meat_product_db(db, product_id, meat_product)
        return update_meat_product_db(db, product_id, meat_product)
    
    # 3. except HTTPException as e
    except HTTPException as e:
        print(e)
        raise e
    
    # 4. except SaveFileException as e
    except SaveFileException as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Error al guardar el fichero.'
        )

    # 5. except Exception as e
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo actualizar el producto carnico.'
        )
    # 13. FIN
    

# 1. Inicio
@router.delete('/meat-products/{product_id}', tags=['delete-meat-product'], 
    dependencies=[Depends(role_permisisons.if_is_superuser)],
    status_code=status.HTTP_204_NO_CONTENT)
async def delete_meat_products(product_id: str, db: Session = Depends(get_db)
) -> None:
    # 2. try
    try:

        # 4. if not get_meat_product_by_id(db, product_id)
        if get_meat_product_by_id(db, product_id): 
            delete_meat_product_by_id(db, product_id)
            # 5. if get_meat_product_by_id(db, product_id)
            if get_meat_product_by_id(db, product_id):
                # 6. raise Exception()
                raise Exception()
        # 7. return None
        return None

    # 3. except Exception as e
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo eliminar el producto carnico.'
        )
    
    # 8. Fin
