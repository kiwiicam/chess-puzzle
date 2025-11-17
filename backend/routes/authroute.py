from flask import Blueprint, request, jsonify
import os
import requests
from controllers.authController import signup, confirm_signup, login
from dotenv import load_dotenv

load_dotenv()

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

# === EXISTING ROUTES ===
@auth_bp.route('/signup', methods=['POST'])
def signup_route():
    return signup()

@auth_bp.route('/confirm-signup', methods=['POST'])
def confirm_signup_route():
    return confirm_signup()

@auth_bp.route('/login', methods=['POST'])
def login_route():
    return login()


# === NEW GOOGLE OAUTH ROUTE ===
@auth_bp.route('/google', methods=['POST'])
def google_oauth_route():
    try:
        code = request.json.get("code")

        if not code:
            return jsonify({"error": "Missing authorization code"}), 400

        COGNITO_CLIENT_ID = os.getenv("CLIENT_ID")
        COGNITO_DOMAIN = os.getenv("COGNITO_DOMAIN")  # add this to .env
        REDIRECT_URI = "frontendchess://auth"

        token_url = f"https://{COGNITO_DOMAIN}/oauth2/token"

        data = {
            "grant_type": "authorization_code",
            "client_id": COGNITO_CLIENT_ID,
            "redirect_uri": REDIRECT_URI,
            "code": code,
        }

        headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }

        # Exchange Cognito auth code for tokens
        res = requests.post(token_url, data=data, headers=headers)

        if res.status_code != 200:
            return jsonify({
                "success": False,
                "error": "Token exchange failed",
                "details": res.text
            }), 400

        tokens = res.json()

        return jsonify({
            "success": True,
            "tokens": tokens
        }), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
