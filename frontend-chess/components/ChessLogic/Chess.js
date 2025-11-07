class Chess {
    constructor(FEN, currentTurn) {
        this.board = setUpBoard(FEN)
        this.currentTurn = currentTurn
    }

    setUpBoard(FEN) {
        const FenArray = FEN.split("/");
        const boardMatrix = FenArray.map((row) => {
            const rowArr = [];
            for (const char of row) {
                if (!isNaN(char)) {
                    for (let i = 0; i < parseInt(char); i++) rowArr.push("");
                } else {
                    rowArr.push(char);
                }
            }
            return rowArr;
        });
        return boardMatrix
    }

    //use this.board to access board dont pass it.

    legalMoves(piece) {

    }

    boardToFen() {

    }

}

//usage
const board = Chess("r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R", "w")