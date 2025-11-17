from flask import Blueprint, jsonify, request
import os
from dotenv import load_dotenv
import boto3

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "../.env"))
aws_region = os.getenv("AWS_REGION")
aws_client_id = os.getenv("ACCESS_KEY")
aws_client_secret = os.getenv("SECRET_ACCESS_KEY")


def getReflexPuzzle():
    # elo range for later use when elo is setup
    #data = request.get_json()
    #eloRange = data.get('eloRange')

    dynamodb = boto3.resource(
        'dynamodb',
        region_name=aws_region,
        aws_access_key_id=aws_client_id,
        aws_secret_access_key=aws_client_secret
    )
    table = dynamodb.Table('reflexPuzzles')
    
    # Scan the table
    response = table.scan()
    items = response['Items']
    return jsonify({"items": items}), 200