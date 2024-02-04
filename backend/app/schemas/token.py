from pydantic import BaseModel

class Token(BaseModel):
    access_token: str


class TokenInput(BaseModel):
    token: str


class TokenIsValid(BaseModel):
    is_valid: bool