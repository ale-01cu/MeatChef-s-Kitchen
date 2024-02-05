from pydantic import BaseModel
from fastapi import UploadFile, File
from typing import Annotated

class MeatProductCreate(BaseModel):
    type_of_meat: str
    name_of_the_cut_of_meat: str
    description: str | None
    price: float
    photo: str | None
    category: str

class MeatProduct(MeatProductCreate):
    id: str
