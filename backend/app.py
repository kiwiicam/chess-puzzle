from dotenv import load_dotenv
import os
import boto3
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from passlib.context import CryptContext


load_dotenv()


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace * with your Expo dev IP in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


dynamodb = boto3.resource(
    "dynamodb",
    region_name=os.getenv("AWS_DEFAULT_REGION"),
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
)


table = dynamodb.Table("Users")


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(BaseModel):
    email: str
    username: str
    password: str


@app.get("/")
def root():
    return {"message": "Backend is running and connected to AWS"}


@app.post("/signup")
def signup(user: User):
    # Check if user already exists
    existing = table.get_item(Key={"email": user.email})
    if "Item" in existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password before storing
    hashed_pw = pwd_context.hash(user.password)

    # Add the user to DynamoDB
    table.put_item(Item={
        "email": user.email,
        "username": user.username,
        "password": hashed_pw
    })

    return {"message": "User created successfully", "email": user.email}


@app.get("/users")
def get_all_users():
    try:
        response = table.scan()
        users = response.get("Items", [])
        for u in users:
            u.pop("password", None)  # hide passwords in response
        return {"users": users}
    except Exception as e:
        return {"error": str(e)}


@app.post("/add-test-user")
def add_test_user():
    table.put_item(Item={
        "email": "test@example.com",
        "username": "Player1",
        "password": "secret"
    })
    return {"message": "Test user added!"}
