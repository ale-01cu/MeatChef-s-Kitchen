from fastapi.testclient import TestClient
from main import app

client = TestClient(app)
email = "ale@gmail.com"
password = "123456"

# Login correcto.
def test_login():
    response = client.post(
        "/login",
        headers={"Content-Type": "application/json"},
        json={"email": email, "password": password}
    )
    assert response.status_code == 200
    assert response.json()["access_token"]


# Email incorrecto.
def test_login_bad_request_email_not_found():
    response = client.post(
        "/login",
        headers={"Content-Type": "application/json"},
        json={"email": 'xxxxxx', "password": password}
    )
    assert response.status_code == 404
    assert response.json()["detail"] == 'Email o contraseña incorrecto.'

# Contraseña incorrecta.
def test_login_bad_request_password_not_found():
    response = client.post(
        "/login",
        headers={"Content-Type": "application/json"},
        json={"email": email, "password": 'xxxxxx'}
    )
    assert response.status_code == 404
    assert response.json()["detail"] == 'Email o contraseña incorrecto.'


# Email y contraseña incorrectos.
def test_login_bad_request_email_and_password_not_found():
    response = client.post(
        "/login",
        headers={"Content-Type": "application/json"},
        json={"email": 'xxxxxx', "password": 'xxxxxx'}
    )
    assert response.status_code == 404
    assert response.json()["detail"] == 'Email o contraseña incorrecto.'




# Registro correcto.
def test_register():
    response = client.post(
        "/register",
        headers={"Content-Type": "application/json"},
        json={
            "email": "prueba@gmail.com", 
            "password": "123456",
            'full_name': 'Prueba del register',
            'phone_number': '54935555',
        }
    )
    assert response.status_code == 201
    assert response.json() == None


# Datos vacios.
def test_register_bad_request_data_empty():
    response = client.post(
        "/register",
        headers={"Content-Type": "application/json"},
        json={
            "email": "", 
            "password": "",
            'full_name': '',
            'phone_number': '',
        }
    )
    assert response.status_code == 422

# Email ya existe.
def test_register_bad_request_email_already_exist():
    response = client.post(
        "/register",
        headers={"Content-Type": "application/json"},
        json={
            "email": "prueba@gmail.com", 
            "password": "123456",
            'full_name': 'Prueba del register',
            'phone_number': '54935555',
        }
    )
    assert response.status_code == 400
    assert response.json()['detail'] == 'El email ya esta en uso.'

# Numero de telefono ya existe.
def test_register_bad_request_phone_number_already_exist():
    response = client.post(
        "/register",
        headers={"Content-Type": "application/json"},
        json={
            "email": "prueba2@gmail.com", 
            "password": "123456",
            'full_name': 'Prueba del register',
            'phone_number': '54935555',
        }
    )
    assert response.status_code == 400
    assert response.json()['detail'] == 'El numero de telefono ya esta en uso.'