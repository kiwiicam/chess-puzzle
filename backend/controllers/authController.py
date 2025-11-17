from flask import request, jsonify
import boto3
import os
import hmac
import hashlib
import base64
from dotenv import load_dotenv

load_dotenv()

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")
aws_region = os.getenv("AWS_REGION")

client = boto3.client("cognito-idp", region_name=aws_region)

def get_secret_hash(username):
    message = username + client_id
    digest = hmac.new(
        client_secret.encode("utf-8"),
        msg=message.encode("utf-8"),
        digestmod=hashlib.sha256
    ).digest()
    return base64.b64encode(digest).decode()


# ============= SIGN UP =================
def signup():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        display_name = data.get("username")  # your app username

        
        username = email

        secret_hash = get_secret_hash(username)

        response = client.sign_up(
            ClientId=client_id,
            Username=username,
            Password=password,
            SecretHash=secret_hash,
            UserAttributes=[
                {"Name": "email", "Value": email},
                {"Name": "nickname", "Value": display_name}  
            ]
        )


        return jsonify({
            "verify": True,
            "cognito_response": response
        }), 200


    except client.exceptions.UsernameExistsException:
        return jsonify({"error": "User already exists"}), 400

    except client.exceptions.InvalidPasswordException:
        return jsonify({"error": "Password does not meet requirements"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ============= CONFIRM SIGNUP =================
def confirm_signup():
    try:
        data = request.get_json()
        email = data.get("email")
        code = data.get("code")

        secret_hash = get_secret_hash(email)

        client.confirm_sign_up(
            ClientId=client_id,
            Username=email,
            ConfirmationCode=code,
            SecretHash=secret_hash
        )

        return jsonify({"success": True, "message": "Email verified"}), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400


# ============= LOGIN =================
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        secret_hash = get_secret_hash(email)

        response = client.initiate_auth(
            ClientId=client_id,
            AuthFlow="USER_PASSWORD_AUTH",
            AuthParameters={
                "USERNAME": email,
                "PASSWORD": password,
                "SECRET_HASH": secret_hash
            }
        )

        return jsonify({
            "success": True,
            "tokens": response.get("AuthenticationResult")
        }), 200

    except client.exceptions.NotAuthorizedException:
        return jsonify({"success": False, "error": "Incorrect email or password"}), 400

    except client.exceptions.UserNotConfirmedException:
        return jsonify({"success": False, "error": "User not verified"}), 400

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


