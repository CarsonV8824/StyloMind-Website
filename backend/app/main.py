import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

#basic user model for demonstration purposes
class User(BaseModel):
    id: int

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)

@app.get("/", response_model=User)
def read_root():
    return User(id=1)

@app.post("/", response_model=User)
def create_user(user: User):
    return User(id=user.id)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)