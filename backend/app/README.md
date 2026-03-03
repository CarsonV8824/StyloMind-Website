## 1️⃣ main.py

- **Entry point of the application**
- **Responsibilities:**
  - Creates the FastAPI app
  - Adds middleware (CORS, authentication, etc.)
  - Includes routers
  - Initializes the application

### Example

```python
from fastapi import FastAPI
from app.api.routes import router

app = FastAPI()
app.include_router(router)
```

> Think of this as the control center that wires everything together.

---

## 2️⃣ api/ – Route Layer

- **Endpoint definitions**
- **Router grouping**
- **HTTP request/response handling**
- This layer should **NOT** contain business logic.

**Example structure:**
```
api/
├── routes.py
├── users.py
├── auth.py
```

### Example route file

```python
from fastapi import APIRouter
from app.services.user_service import create_user

router = APIRouter(prefix="/users")

@router.post("/")
def create(user_data: dict):
    return create_user(user_data)
```

**The route layer:**
- Accepts request
- Validates via schemas
- Calls service layer
- Returns response

> Keep it thin.

---

## 3️⃣ models/ – Database Models

- **Defines database table structures**

**Example (SQLAlchemy):**
```python
from sqlalchemy import Column, Integer, String
from app.db.base import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
```

> Models represent how data is stored in the database.

---

## 4️⃣ schemas/ – Pydantic Schemas

- **Defines:**
  - Input validation
  - Response formatting
  - API contracts

**Example:**
```python
from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str

class UserResponse(BaseModel):
    id: int
    name: str
```

**Difference between models and schemas:**

| Folder   | Purpose                        |
|----------|-------------------------------|
| models/  | Database structure            |
| schemas/ | API validation & serialization|

---

## 5️⃣ services/ – Business Logic Layer

- **Contains:**
  - Core application logic
  - Database operations
  - External API calls
  - ML model interactions
  - Complex computations

**Example:**
```python
from app.models.user import User
from app.db.session import SessionLocal

def create_user(user_data):
    db = SessionLocal()
    user = User(name=user_data["name"])
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
```

> This is where real logic belongs.

---

## 6️⃣ core/ – Application Configuration

- **Contains:**
  - Environment settings
  - Security configuration
  - JWT secrets
  - App-wide constants

**Example:**
```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str

settings = Settings()
```

> This folder centralizes configuration.

---

## 7️⃣ db/ – Database Setup

- **Handles:**
  - Engine creation
  - Session management
  - Base model declaration

**Example:**
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("sqlite:///./test.db")
SessionLocal = sessionmaker(bind=engine)
```

> This folder manages database connectivity.

---

## 8️⃣ utils/ – Helper Utilities

- **Contains reusable helper functions:**
  - Password hashing
  - Token generation
  - Date formatting
  - General-purpose utilities

**Example:**
```python
def hash_password(password: str) -> str:
    ...
```

> If it's reusable but not business logic, put it here.