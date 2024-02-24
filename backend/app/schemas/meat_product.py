from pydantic import BaseModel
from .category import CategorySchema

class MeatProductCreate(BaseModel):
    type_of_meat: str
    name_of_the_cut_of_meat: str
    description: str
    price: float
    photo: str
    category_id: str
    is_active: bool = True

class MeatProduct(BaseModel):
    id: str
    type_of_meat: str
    name_of_the_cut_of_meat: str
    description: str
    price: float
    photo: str
    category: CategorySchema
    is_active: bool = True
