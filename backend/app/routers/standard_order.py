from fastapi import (
    APIRouter, Depends, 
    HTTPException, status
)
from app.cruds.standard_order import (
    create_standard_order_db,
    list_standard_order_db,
    update_standard_order_status_db,
    get_standard_order_by_id,
    delete_standard_order_by_id,
    list_standard_order_by_user_db,
    list_processed_standard_order_db
)
from app.schemas.standard_order import (
    StandardOrderInputSchema,
    StandardOrderSchema,
    StandardOrderListSchema,
)
from settings.db import get_db
from sqlalchemy.orm import Session
from app.middlewares.authorization import authorization
from app.middlewares.owner_permissions import order_owner_permissions
from app.middlewares.role_permisisons import if_is_superuser, if_is_staff
from app.schemas.user import UserSchema

router = APIRouter()
ENDPOINT = '/standard-order'

@router.get(ENDPOINT, tags=['list-orders'])
async def list_order(user: UserSchema = Depends(authorization),
    db: Session = Depends(get_db) ) -> list[StandardOrderListSchema]:
    try:
        if user:
            if user.is_superuser or user.is_staff:
                orders = list_standard_order_db(db)
                return orders
        orders = list_standard_order_by_user_db(db, user.id)
        return orders

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo listar las ordenes.'
        )
    

@router.get(ENDPOINT + '-processed', tags=['list-processed-orders'],
    dependencies=[Depends(if_is_staff)])
async def list_processed_order(db: Session = Depends(get_db) 
) -> list[StandardOrderListSchema]:
    try:
        orders = list_processed_standard_order_db(db)
        return orders

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo listar las ordenes.'
        )


@router.get(ENDPOINT + '/{order_id}', tags=['get-order'], 
    dependencies=[Depends(order_owner_permissions)])
async def get_order(order_id: str, db: Session = Depends(get_db)
) -> StandardOrderSchema:
    try:

        order = get_standard_order_by_id(db, order_id)
        if not order: raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='La orden no existe.'
        )
        return order

    except HTTPException as e:
        print(e)
        raise e

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo devolver la orden.'
        )


@router.post(ENDPOINT, 
    tags=['create-order'], status_code=status.HTTP_201_CREATED)
async def create_order(
    order : StandardOrderInputSchema, 
    user: UserSchema = Depends(authorization), 
    db: Session = Depends(get_db),
) -> None:
    try:
        create_standard_order_db(db, order, user.id)

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo crear una nueva orden.'
        )
    


# @router.put(ENDPOINT + '/{order_id}', tags=['update-order'],
#     dependencies=[Depends(if_is_superuser)])
# async def update_order_status(
#     order_id: str, 
#     order_status: StandardOrderUpdateStatusSchema, 
#     db: Session = Depends(get_db)
# ) -> StandardOrderSchema:
#     try:
        
#         order = update_standard_order_status_db(db, order_id, order_status.status)
#         return order
    
#     except Exception as e:
#         print(e)
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail='No se pudo actualizar orden.'
#         )
    

@router.delete(ENDPOINT + '/{order_id}', tags=['delete-order'], 
    dependencies=[Depends(if_is_superuser)],
    status_code=status.HTTP_204_NO_CONTENT)
async def delete_order(order_id: str, db: Session = Depends(get_db)
) -> None:
    try:

        if not get_standard_order_by_id(db, order_id): return None
        delete_standard_order_by_id(db, order_id)
        if get_standard_order_by_id(db, order_id):
            raise Exception()
        return None

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo eliminar la orden.'
        )
    
    
from app.models.order import Statuslist, DeliveryType, PaymentMethod
from app.schemas.standard_order import (
    StandardOrderStatusSchema, 
    StandardOrderDeliverySchema, 
    StandardOrderPaymentSchema
)

@router.get(ENDPOINT + '-status', tags=['list-order-status'])
async def list_order_status(db: Session = Depends(get_db)
) -> list[StandardOrderStatusSchema]:
    try: return [{'status': status} for status in Statuslist.STATUS_LIST]
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo listar las estados.'
        )
    
@router.get(ENDPOINT + '-deliveryType', tags=['list-order-deliveryType'])
async def list_order_delivery_type(db: Session = Depends(get_db)
) -> list[StandardOrderDeliverySchema]:
    try: return [{'type': type} for type in DeliveryType.DELIVERY_TYPE_LIST]
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo listar los tipos de delivery.'
        )

@router.get(ENDPOINT + '-paymentMethod', tags=['list-order-paymentMethod'])
async def list_order_payment_method(db: Session = Depends(get_db)
) -> list[StandardOrderPaymentSchema]:
    try: return [{'method': method} for method in PaymentMethod.PAYMENT_METHOD_LIST]
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo listar los metodos de pago.'
        )
