import hashlib
import hmac
import secrets


def hash_password(password: str, salt_hex: str) -> str:
    salt = bytes.fromhex(salt_hex)
    hashed = hashlib.scrypt(password.encode("utf-8"), salt=salt, n=2**14, r=8, p=1)
    return hashed.hex()


def verify_password(password: str, salt_hex: str, expected_hash: str) -> bool:
    current_hash = hash_password(password, salt_hex)
    return hmac.compare_digest(current_hash, expected_hash)


def generate_salt() -> str:
    return secrets.token_hex(16)


def generate_token() -> str:
    return secrets.token_urlsafe(32)
