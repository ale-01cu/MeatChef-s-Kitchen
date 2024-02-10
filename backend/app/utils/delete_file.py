import os

def delete_file(path: str) -> None:
    try:
        os.remove(path)
        print(f"El archivo '{path}' ha sido eliminado correctamente.")
    except FileNotFoundError:
        print(f"El archivo '{path}' no existe.")

