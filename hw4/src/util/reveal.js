/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, setNonMineCount, nonMineCount) => {
    // board[x][y].revealed = true;

    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.
    //TODO: set newNonMinesCount to when reveal == 0
    // console.log("start: ", newNonMinesCount, `(${x}, ${y})`);
    if (!board[x][y].revealed) {
        if (board[x][y].value !== 0) {
            board[x][y].revealed = true;
            setNonMineCount((prev) => prev - 1);
            // newNonMinesCount--;
            console.log("1", nonMineCount);
        } else if (board[x][y].value === 0) {
            board[x][y].revealed = true;
            setNonMineCount((prev) => prev - 1);
            console.log("2", nonMineCount);

            if (x !== board.length - 1) {
                // reveal down cell
                revealed(board, x + 1, y, setNonMineCount, nonMineCount);
            }
            if (y !== board.length - 1) {
                // reveal right cell
                revealed(board, x, y + 1, setNonMineCount, nonMineCount);
            }
            if (x !== 0) {
                // reveal up cell
                revealed(board, x - 1, y, setNonMineCount, nonMineCount);
            }
            if (y !== 0) {
                // reveal left cell
                revealed(board, x, y - 1, setNonMineCount, nonMineCount);
            }
        }
    }
    console.log("end: ", nonMineCount);
    return { board, nonMineCount };
};
