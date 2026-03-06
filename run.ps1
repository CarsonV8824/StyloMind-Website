# run.ps1 (run from repo root) for local development. It starts the backend and frontend servers in separate PowerShell windows.

# run.ps1 (from repo root)
$python = ".\.venv\Scripts\python.exe"

Start-Process powershell -ArgumentList "-NoExit", "-Command", "& `"$python`" -m uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
