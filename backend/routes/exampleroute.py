from flask import Blueprint, jsonify
from controllers.examplecontroller import get_users

example_bp = Blueprint('example', __name__, url_prefix='/api/example')

@example_bp.route('/users', methods=['POST'])
def users():
    return get_users()