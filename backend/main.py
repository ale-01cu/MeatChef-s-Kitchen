from typing import Union
from settings.db import SessionLocal, engine
from app.models import user as userModel
from sqlalchemy.orm import Session
from fastapi import FastAPI, Depends
from settings.db import get_db
from app.routers import auth
from app.routers import user

userModel.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(auth.router)
app.include_router(user.router)

# @app.get("/")
# def read_root(db: Session = Depends(get_db)):
#     user = userSchema.UserCreateSchema(
#         id = 1,
#         email = 'almejo@gmail.com',
#         full_name = 'almejo arpentino',
#         password = '123'
#     )
#     userCRUD.create_user(db, user)
#     return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}