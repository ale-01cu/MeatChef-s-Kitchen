from fastapi import APIRouter, Depends, HTTPException, status
from app.middlewares.role_permisisons import if_is_teacher
router = APIRouter()


@router.get('/is-teacher', tags=['verify-token'],
    dependencies=[Depends(if_is_teacher)], status_code=status.HTTP_204_NO_CONTENT)
async def is_teacher() -> None:
    pass