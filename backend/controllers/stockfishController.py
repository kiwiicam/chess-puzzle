from stockfish import Stockfish
import os
print(os.path.exists("../stockfish/stockfish-windows-x86-64-avx2.exe"))

stockfish = Stockfish(path="../stockfish/stockfish-windows-x86-64-avx2.exe")

stockfish.set_fen_position("r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 4")

evaluation = stockfish.get_evaluation()

print(evaluation)
