from pathlib import Path


class Settings:
    APP_ROOT = Path(__file__).resolve().parents[1]
    BACKEND_ROOT = Path(__file__).resolve().parents[2]
    DB_PATH = BACKEND_ROOT / "database" / "Stylo Mind.db"
    API_HOST = "127.0.0.1"
    API_PORT = 8000
    CORS_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]


settings = Settings()
