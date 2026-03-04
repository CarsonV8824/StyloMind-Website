from backend.app.db.database import Database
import json

def create_user_table():
    with Database() as db:
        db.cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                texts TEXT
            )
        """)
        db.connection.commit()

def get_user_by_id(user_id):
    with Database() as db:
        db.cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        user = db.cursor.fetchone()
        return user
    
def create_user(name, email):
    with Database() as db:
        db.cursor.execute("INSERT INTO users (name, email) VALUES (?, ?)", (name, email))
        db.connection.commit()
        return db.cursor.lastrowid
    
def update_user_texts(user_id, texts):
    with Database() as db:
        texts_json = json.dumps(texts)
        db.cursor.execute("UPDATE users SET texts = ? WHERE id = ?", (texts_json, user_id))
        db.connection.commit()