from fastapi import (
    APIRouter, 
    Header, Response
)
import os
router = APIRouter()

CHUNK_SIZE = 1024*1024

@router.get("/video/{video_path}")
async def video_endpoint(video_path: str, range: str = Header(default="bytes=0-")):
    start, end = range.replace("bytes=", "").split("-")
    start = int(start)
    end = int(end) if end else start + CHUNK_SIZE
    with open(video_path, "rb") as video:
        video.seek(start)
        data = video.read(end - start)
        filesize = str(os.path.getsize(video_path))
        headers = {
            'Content-Range': f'bytes {str(start)}-{str(end)}/{filesize}',
            'Accept-Ranges': 'bytes'
        }
        return Response(
            data, 
            status_code=206, 
            headers=headers, 
            media_type="video/mp4"
        )