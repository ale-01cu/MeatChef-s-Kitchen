from pydantic import BaseModel

class OrderUpdateStatusSchema(BaseModel):
    id: str
    status: str