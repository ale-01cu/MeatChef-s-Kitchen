@echo off
call .\backend\.venv\Scripts\activate
start cmd /k "cd .\backend && python -m uvicorn main:app --reload --port 8000"
start cmd /k "cd .\frontend && npm run dev"