from flask import jsonify, request
import boto3
from dotenv import load_dotenv
import os
import hmac
import hashlib
import base64
from flask import Flask
from routes.authroute import auth_bp
#from routes.exampleroute import example_bp

app = Flask(__name__)

app.register_blueprint(auth_bp)
#app.register_blueprint(example_bp)

if __name__ == "__main__":
    app.run(debug=True)


load_dotenv()

client_secret = os.getenv("CLIENT_SECRET")
client_id = os.getenv("CLIENT_ID")
aws_region = os.getenv("AWS_REGION")

client = boto3.client("cognito-idp", region_name=aws_region)

def get_secret_hash(username):
    message = username + client_id
    dig = hmac.new(
        client_secret.encode("utf-8"),
        msg=message.encode("utf-8"),
        digestmod=hashlib.sha256
    ).digest()
    return base64.b64encode(dig).decode()

def sign_up():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        username = data.get("username") or email  # fallback

        secret_hash = get_secret_hash(username)

        response = client.sign_up(
            ClientId=client_id,
            Username=username,
            Password=password,
            SecretHash=secret_hash,
            UserAttributes=[
                {"Name": "email", "Value": email}
            ]
        )

        return jsonify({
            "verify": not response.get("UserConfirmed", False),
            "cognito_response": response
        }), 200

    except client.exceptions.UsernameExistsException:
        return jsonify({"error": "User already exists", "verify": False}), 400

    except client.exceptions.InvalidPasswordException:
        return jsonify({"error": "Password does not meet requirements", "verify": False}), 400

    except client.exceptions.CodeDeliveryFailureException as e:
        return jsonify({"error": "Failed to send verification code", "details": str(e)}), 500

    except Exception as e:
        print("Error in sign_up:", e)
        return jsonify({"error": "Internal server error", "details": str(e), "verify": False}), 500
