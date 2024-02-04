from pydantic import BaseModel

class UserBaseSchema(BaseModel):
    id: str

    class Config:
        from_attributes = True


class UserCreateSchema(BaseModel):
    email: str
    full_name: str
    password: str


class UserSchema(UserBaseSchema):
    email: str
    full_name: str
    avatar: str

class UserLogin(BaseModel):
    email: str
    password: str
