from fastapi import FastAPI
from settings.db import engine
from settings.db import Base
from app.routers import (
    auth, 
    user, 
    meat_product, 
    category,
    course,
    sales,
    permissions,
    custom_order,
    standard_order,
    order
)
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.mount("/media", StaticFiles(directory="media"), name="media")

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(meat_product.router)
app.include_router(category.router)
app.include_router(course.router)
app.include_router(sales.router)
app.include_router(permissions.router)
app.include_router(standard_order.router)
app.include_router(custom_order.router)
app.include_router(order.router)


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

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)


