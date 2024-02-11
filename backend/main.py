from fastapi import FastAPI
from settings.db import engine
from app.models import (
    user as user_model,
    meat_product as meat_product_model,
    category as category_model,
    course as course_model,
    order as order_model
)
from app.routers import (
    auth, 
    user, 
    meat_product, 
    category,
    course,
    order
)

user_model.Base.metadata.create_all(bind=engine)
meat_product_model.Base.metadata.create_all(bind=engine)
category_model.Base.metadata.create_all(bind=engine)
course_model.Base.metadata.create_all(bind=engine)
order_model.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(meat_product.router)
app.include_router(category.router)
app.include_router(course.router)
app.include_router(order.router)

