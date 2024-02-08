from pydantic import BaseModel

class CategoryCreate(BaseModel):
    name: str


class CategorySchema(BaseModel):
    id: str
    name: str