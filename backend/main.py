from fastapi import FastAPI
from settings.db import engine
from settings.db import Base
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
    order,
    sales,
    permissions,
    custom_order
)
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

# user_model.Base.metadata.create_all(bind=engine)
# meat_product_model.Base.metadata.create_all(bind=engine)
# category_model.Base.metadata.create_all(bind=engine)
# course_model.Base.metadata.create_all(bind=engine)
# order_model.Base.metadata.create_all(bind=engine)

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.mount("/media", StaticFiles(directory="media"), name="media")

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(meat_product.router)
app.include_router(category.router)
app.include_router(course.router)
app.include_router(order.router)
app.include_router(sales.router)
app.include_router(permissions.router)
app.include_router(custom_order.router)


origins = [
    "http://localhost:5173",
    "http://localhost:4173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


