from fastapi import UploadFile
from app.errors.SaveFileException import SaveFileException
from app.schemas.file import FileSchema
import os

async def save_file(file: UploadFile, path: str) -> FileSchema:
    file_name = file.filename
    
    if file.size == 0:
        return FileSchema(
            path='',
            filename=''
        )
    
    if not path:
        raise SaveFileException(f'Error al guardar el fichero {file_name}.')
    

    if not os.path.exists(path):
        os.makedirs(path)

    contents = await file.read()
    with open(f'{path}/{file_name}', "wb") as f:
        f.write(contents)
    
    return FileSchema(
        path=path + f'/{file_name}', 
        filename=file_name
    )