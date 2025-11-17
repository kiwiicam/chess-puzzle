from flask import Blueprint, jsonify
from controllers.databaseController import getReflexPuzzle

database_bp = Blueprint('database', __name__, url_prefix='/api/database')


@database_bp.route('/getReflexPuzzle', methods=['GET'])
def users():
    return getReflexPuzzle()
