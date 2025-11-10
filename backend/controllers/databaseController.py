from flask import Blueprint, jsonify


def getReflexPuzzle():
    return jsonify({"msg": "List of users"})
