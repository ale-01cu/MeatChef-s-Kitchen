from pydantic import BaseModel

class FileSchema(BaseModel):
    path: str
    filename: str