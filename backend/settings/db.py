from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:admin@localhost:5432/meatchef"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    pool_size=20, max_overflow=0
    # connect_args={"check_same_thread": False}
)

# engine = create_engine("mysql://" + loadConfigVar("user") + ":" + loadConfigVar("password") + "@" + loadConfigVar("host") + "/" + loadConfigVar("schema"), 
#                         pool_size=20, max_overflow=0)

SessionLocal = sessionmaker(
    autocommit=False, 
    autoflush=False, 
    bind=engine
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


Base = declarative_base()