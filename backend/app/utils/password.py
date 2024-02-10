from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


def hash_password(password: str):
    return pwd_context.hash(password)



# # Hash a password using bcrypt
# def hash_password(password: str) -> bytes:
#     pwd_bytes = password.encode('utf-8')
#     salt = bcrypt.gensalt()
#     hashed_password = bcrypt.hashpw(password=pwd_bytes, salt=salt)
#     return hashed_password

# Check if the provided password matches the stored password (hashed)
# def verify_password(plain_password: str, hashed_password: str) -> str:
#     password_byte_enc = plain_password.encode('utf-8')
#     print(password_byte_enc)
#     return bcrypt.checkpw(
#         password=password_byte_enc , 
#         hashed_password=hashed_password
#     )