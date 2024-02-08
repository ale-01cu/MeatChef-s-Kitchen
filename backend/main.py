from settings.db import engine
from app.models import (
    user as user_model,
    meat_product as meat_product_model,
    category as category_model
)
from fastapi import FastAPI, UploadFile, File, Form
from app.routers import auth
from app.routers import user
from app.routers import meat_product
from app.routers import category
app = FastAPI()

user_model.Base.metadata.create_all(bind=engine)
meat_product_model.Base.metadata.create_all(bind=engine)
category_model.Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(meat_product.router)
app.include_router(category.router)

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
