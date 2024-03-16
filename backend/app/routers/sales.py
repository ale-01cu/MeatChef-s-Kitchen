from fastapi import (
    APIRouter, Depends, 
    HTTPException, status
)

from app.cruds.sales import list_sales_db
from settings.db import get_db
from sqlalchemy.orm import Session
from app.middlewares.role_permisisons import if_is_superuser
from app.schemas.sales import SalesSchema

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