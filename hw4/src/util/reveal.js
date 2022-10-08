/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, setNonMineCount, nonMineCount, setBoard, boardSize) => {
    let orig_count = nonMineCount;
    // board[x][y].revealed = true;

    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.
    //TODO: set newNonMinesCount to when reveal == 0
    if (!board[x][y].revealed) {
        if (board[x][y].value !== 0 && !board[x][y].flagged) {
            board[x][y].revealed = true;
        } else {
            if (!board[x][y].flagged) {
                board[x][y].revealed = true;
            }

            if (x !== board.length - 1) {
                // reveal down cell
                revealed(board, x + 1, y, setNonMineCount, nonMineCount, setBoard);
            }
            if (y !== board.length - 1) {
                // reveal right cell
                revealed(board, x, y + 1, setNonMineCount, nonMineCount, setBoard);
            }
            if (x !== 0) {
                // reveal up cell
                revealed(board, x - 1, y, setNonMineCount, nonMineCount, setBoard);
            }
            if (y !== 0) {
                // reveal left cell
                revealed(board, x, y - 1, setNonMineCount, nonMineCount, setBoard);
            }
        }
    }
    return { board, nonMineCount };
};
