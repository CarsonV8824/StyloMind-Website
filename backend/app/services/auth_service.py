from fastapi import HTTPException, status
from backend.app.db.session import get_connection
from backend.app.models.auth_model import (
    CREATE_AUTH_TOKENS_TABLE_SQL,
    CREATE_USERS_TABLE_SQL,
)
from backend.app.utils.security import (
    generate_salt,
    generate_token,
    hash_password,
    verify_password,
)


def initialize_auth_storage() -> None:
    with get_connection() as connection:
        connection.execute(CREATE_USERS_TABLE_SQL)
        connection.execute(CREATE_AUTH_TOKENS_TABLE_SQL)
        connection.commit()


def register_user(username: str, password: str) -> dict[str, str]:
    normalized_username = username.strip().lower()
    if not normalized_username or not password:
        raise HTTPException(status_code=400, detail="Username and password are required.")

    with get_connection() as connection:
        existing_user = connection.execute(
            "SELECT username FROM users WHERE username = ?",
            (normalized_username,),
        ).fetchone()
        if existing_user:
            raise HTTPException(status_code=409, detail="User already exists.")

        salt = generate_salt()
        password_hash = hash_password(password, salt)
        connection.execute(
            "INSERT INTO users (username, salt, password_hash) VALUES (?, ?, ?)",
            (normalized_username, salt, password_hash),
        )

        token = generate_token()
        connection.execute(
            "INSERT INTO auth_tokens (token, username) VALUES (?, ?)",
            (token, normalized_username),
        )
        connection.commit()
        return {"access_token": token, "token_type": "bearer"}


def login_user(username: str, password: str) -> dict[str, str]:
    normalized_username = username.strip().lower()
    with get_connection() as connection:
        user_record = connection.execute(
            "SELECT salt, password_hash FROM users WHERE username = ?",
            (normalized_username,),
        ).fetchone()
        if not user_record:
            raise HTTPException(status_code=401, detail="Invalid credentials.")

        if not verify_password(password, user_record["salt"], user_record["password_hash"]):
            raise HTTPException(status_code=401, detail="Invalid credentials.")

        token = generate_token()
        connection.execute(
            "INSERT INTO auth_tokens (token, username) VALUES (?, ?)",
            (token, normalized_username),
        )
        connection.commit()
        return {"access_token": token, "token_type": "bearer"}


def get_username_by_token(token: str) -> str:
    with get_connection() as connection:
        row = connection.execute(
            "SELECT username FROM auth_tokens WHERE token = ?",
            (token,),
        ).fetchone()
        if not row:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token.",
            )
        return str(row["username"])
