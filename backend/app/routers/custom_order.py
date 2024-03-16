from fastapi import (
    APIRouter, Depends, 
    HTTPException, status
)
from app.cruds.custom_order import (
    create_custom_order_db,
    list_custom_order_by_user_db,
    list_custom_order_db,
    update_custom_order_status_db,
    list_processed_custom_order_db
)
from app.schemas.custom_order import (
    CustomOrderCreateSchema,
    CustomOrderListSchema,
    CustomOrderUpdateStatusSchema
)
from settings.db import get_db
from sqlalchemy.orm import Session
from app.middlewares.authorization import authorization
from app.middlewares.role_permisisons import if_is_staff
from app.schemas.user import UserSchema

router = APIRouter()


@router.get('/custom-order', tags=['list-order'])
async def list_custom_order(user: UserSchema = Depends(authorization),
    db: Session = Depends(get_db) ) -> list[CustomOrderListSchema]:
    try:
        if user:
            if user.is_superuser or user.is_staff:
                orders = list_custom_order_db(db)
                return orders
        orders = list_custom_order_by_user_db(db, user.id)
        return orders
        

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo listar las ordenes.'
        )
    

@router.get('/custom-order-processed', tags=['list-processed-order'],
    dependencies=[Depends(if_is_staff)])
async def list_processed_custom_order(db: Session = Depends(get_db) 
) -> list[CustomOrderListSchema]:
    try:
        orders = list_processed_custom_order_db(db)
        return orders

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo listar las ordenes.'
        )


@router.put('/custom-order', tags=['update-custom-order--list-status'],
    dependencies=[Depends(if_is_staff)])
async def opdate_custom_order_list_status(
    custom_order_list: list[CustomOrderUpdateStatusSchema], 
    db: Session = Depends(get_db)
) -> None:
    try:
        
        update_custom_order_status_db(
            db, 
            custom_order_list
        )
    
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo actualizar orden.'
        )

# @router.get('/order/{order_id}', tags=['get-order'], 
#     dependencies=[Depends(order_owner_permissions)])
# async def get_order(order_id: str, db: Session = Depends(get_db)
# ) -> OrderSchema:
#     try:

#         order = get_order_by_id(db, order_id)
#         if not order: raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail='La orden no existe.'
#         )
#         return order

#     except HTTPException as e:
#         print(e)
#         raise e

#     except Exception as e:
#         print(e)
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail='No se pudo devolver la orden.'
#         )


@router.post('/custom-order', 
    tags=['create-custom-order'], status_code=status.HTTP_201_CREATED)
async def create_custom_order(
    order : CustomOrderCreateSchema, 
    user: UserSchema = Depends(authorization), 
    db: Session = Depends(get_db),
) -> None:
    try:
        create_custom_order_db(db, order, user.id)

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='No se pudo crear una nueva orden.'
        )
    


# @router.put('/order/{order_id}', tags=['update-order'],
#     dependencies=[Depends(if_is_superuser)])
# async def update_order_status(
#     order_id: str, 
#     order_status: OrderUpdateStatusSchema, 
#     db: Session = Depends(get_db)
# ) -> OrderSchema:
#     try:
        
#         order = update_order_status_db(db, order_id, order_status.status)
#         return order
    
#     except Exception as e:
#         print(e)
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail='No se pudo actualizar orden.'
#         )
    

# @router.delete('/order/{order_id}', tags=['delete-order'], 
#     dependencies=[Depends(if_is_superuser)],
#     status_code=status.HTTP_204_NO_CONTENT)
# async def delete_order(order_id: str, db: Session = Depends(get_db)
# ) -> None:
#     try:

#         if not get_order_by_id(db, order_id): return None
#         delete_order_by_id(db, order_id)
#         if get_order_by_id(db, order_id):
#             raise Exception()
#         return None

#     except Exception as e:
#         print(e)
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail='No se pudo eliminar la orden.'
#         )
    
    
# from app.models.order import Statuslist, DeliveryType, PaymentMethod
# from app.schemas.order import OrderStatusSchema, OrderDeliverySchema, OrderPaymentSchema

# @router.get('/order-status', tags=['list-order-status'])
# async def list_order_status(db: Session = Depends(get_db)
# ) -> list[OrderStatusSchema]:
#     try: return [{'status': status} for status in Statuslist.STATUS_LIST]
#     except Exception as e:
#         print(e)
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail='No se pudo listar las estados.'
#         )
    
# @router.get('/order-deliveryType', tags=['list-order-deliveryType'])
# async def list_order_delivery_type(db: Session = Depends(get_db)
# ) -> list[OrderDeliverySchema]:
#     try: return [{'type': type} for type in DeliveryType.DELIVERY_TYPE_LIST]
#     except Exception as e:
#         print(e)
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail='No se pudo listar los tipos de delivery.'
#         )

# @router.get('/order-paymentMethod', tags=['list-order-paymentMethod'])
# async def list_order_payment_method(db: Session = Depends(get_db)
# ) -> list[OrderPaymentSchema]:
#     try: return [{'method': method} for method in PaymentMethod.PAYMENT_METHOD_LIST]
#     except Exception as e:
#         print(e)
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail='No se pudo listar los metodos de pago.'
#         )
