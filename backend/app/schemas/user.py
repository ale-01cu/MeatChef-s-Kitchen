from pydantic import BaseModel

class UserBaseSchema(BaseModel):
    id: str

class UserFullNameSchema(BaseModel):
    full_name: str

class UserCreateSchema(BaseModel):
    email: str
    full_name: str
    phone_number: str
    password: str

class UserSchema(UserBaseSchema):
    email: str
    full_name: str
    phone_number: str
    avatar: str

class UserUpdate(BaseModel):
    email: str
    full_name: str
    phone_number: str

class UserLogin(BaseModel):
    email: str
    password: str


class UserFull(BaseModel):
    email: str
    full_name: str
    phone_number: str
    avatar: str
    is_superuser: bool
    is_staff: bool
    is_teacher: bool

