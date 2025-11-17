import chess
from stockfish import Stockfish
import boto3
import os
from dotenv import load_dotenv


load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "../.env"))

stockfish = Stockfish(path="../stockfish/stockfish-windows-x86-64-avx2.exe")

aws_region = os.getenv("AWS_REGION")
aws_client_id = os.getenv("ACCESS_KEY")
aws_client_secret = os.getenv("SECRET_ACCESS_KEY")

fen = input("Enter the FEN")
board = chess.Board(fen)

all_moves = []

for move in board.legal_moves:
    move_uci = move.uci()
    stockfish.set_fen_position(fen)
    stockfish.make_moves_from_current_position([move_uci])

    eval_info = stockfish.get_evaluation()

    if eval_info['type'] == 'cp':
        cp = eval_info['value']
    else:
        cp = 10000 if eval_info['value'] > 0 else -10000

    all_moves.append({
        "Move": move_uci,
        "Centipawn": cp,
        "Mate": None if eval_info['type'] == 'cp' else eval_info['value']
    })


all_moves.sort(key=lambda x: x["Centipawn"], reverse=True)

upload = " "

while upload not in ("y", "n"):
    upload = input("Would you like to upload this puzzle? (y/n): ").lower()

if upload == "y":
    dynamodb = boto3.resource(
        'dynamodb',
        region_name=aws_region,
        aws_access_key_id=aws_client_id,
        aws_secret_access_key=aws_client_secret
    )
    table = dynamodb.Table('reflexPuzzles')
    item = {
        'puzzleID':  fen,
        'Moves': all_moves
    }
    try:
        table.put_item(Item=item)
        print("Upload Succesful")
    except Exception as e:
        print(f"Error uploading: {e}")
else:
    print("no worries have a nice day!")

print("Finished program")
