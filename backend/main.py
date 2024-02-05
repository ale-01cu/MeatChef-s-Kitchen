from settings.db import engine
from app.models import (
    user as userModel,
    meat_product,
    category
)
from sqlalchemy.orm import Session
from fastapi import FastAPI, UploadFile, File, Form
from app.routers import auth
from app.routers import user

app = FastAPI()

userModel.Base.metadata.create_all(bind=engine)
meat_product.Base.metadata.create_all(bind=engine)
category.Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(user.router)

@app.post("/uploadfile/")
async def create_upload_file(
    file: UploadFile = File(), 
    type_of_meat: str = Form(),
    name_of_the_cut_of_meat: str = Form(),
    description: str | None = Form(),
    price: float = Form(),
    category: str = Form()
):
    contents = await file.read()
    with open(f"./{file.filename}", "wb") as f:
        f.write(contents)
    return {"filename": file.filename}
