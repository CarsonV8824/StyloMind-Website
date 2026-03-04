import sqlite3
from backend.app.core.config import settings


def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(settings.DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection
