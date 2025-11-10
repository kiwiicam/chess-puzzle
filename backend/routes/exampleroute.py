from flask import Blueprint, jsonify
from controllers.examplecontroller import getReflexPuzzle

example_bp = Blueprint('example', __name__, url_prefix='/api/example')

@example_bp.route('/users', methods=['POST'])
def users():
    return getReflexPuzzle()