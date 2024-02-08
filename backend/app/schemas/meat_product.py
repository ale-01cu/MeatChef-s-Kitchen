from pydantic import BaseModel

class MeatProductCreate(BaseModel):
    type_of_meat: str
    name_of_the_cut_of_meat: str
    description: str
    price: float
    photo: str
    category: str
    is_active: bool = True

class MeatProduct(MeatProductCreate):
    id: str
