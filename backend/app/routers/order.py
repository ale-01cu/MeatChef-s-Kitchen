from fastapi import (
    APIRouter, Depends, 
    HTTPException, status
)
from settings.db import get_db
from app.middlewares.role_permisisons import if_is_staff
from sqlalchemy.orm import Session
from app.schemas.order import (
    OrderUpdateStatusSchema
)
from app.cruds.order import update_order_list_status_db
router = APIRouter()
ENDPOINT = '/order'

@router.put(ENDPOINT, tags=['update-order_list_status'],
    dependencies=[Depends(if_is_staff)])
async def update_order_status(
    order_list: list[OrderUpdateStatusSchema], 
    db: Session = Depends(get_db)
) -> None:
    try:
        
        update_order_list_status_db(db, order_list)
    
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo actualizar orden.'
        )