from flask import Blueprint, jsonify
from controllers.databaseController import get_users

database_bp = Blueprint('database', __name__, url_prefix='/api/database')


@database_bp.route('/getReflexPuzzle', methods=['GET'])
def users():
    return get_users()
