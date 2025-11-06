from flask import Blueprint, jsonify

def get_users():
    return jsonify({"msg": "List of users"})