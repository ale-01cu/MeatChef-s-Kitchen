from fastapi import (
    APIRouter, Depends, 
    HTTPException, status
)

from app.cruds.sales import list_sales_db
from settings.db import get_db
from sqlalchemy.orm import Session
from app.middlewares.role_permisisons import if_is_superuser
from app.schemas.sales import SalesSchema
from app.cruds.sales import get_most_selled_products_db, list_biggest_buyers__db
from app.schemas.meat_product import MeatProduct
from app.schemas.user import UserListSchema

router = APIRouter()


@router.get('/sales', tags=['list-order'],
    dependencies=[Depends(if_is_superuser)])
async def list_sales(db: Session = Depends(get_db)
) -> SalesSchema:
    try:

        sales = list_sales_db(db,)
        return {
            "orders": sales
        }

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo listar las ventas.'
        )
    
@router.get('/most-selled-product', tags=['-get-most-selled-product'])
async def get_most_selled_product(db: Session = Depends(get_db)
) -> MeatProduct:
    try:

        prod = get_most_selled_products_db(db)
        return prod

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo devolver el producto mas vendido.'
        )

@router.get('/list-biggest-buyers', tags=['list-biggest-buyers'])
async def list_biggest_buyers(db: Session = Depends(get_db)
) -> list[UserListSchema]:
    try:

        users = list_biggest_buyers__db(db)
        return users

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo listar los usuarios que mas compran.'
        )