/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Board.css";
import Cell from "./Cell";
import Modal from "./Modal";
import Dashboard from "./Dashboard";
import { revealed } from "../util/reveal";
import createBoard from "../util/createBoard";
import React, { useEffect, useState } from "react";

const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]); // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0); // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]); // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false); // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0); // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false); // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        // Hint: Read the definition of those Hook useState functions and make good use of them.
        setBoard(newBoard.board);
        setNonMineCount(boardSize * boardSize - mineNum);
        setMineLocations(newBoard.mineLocations);
        setRemainFlagNum(mineNum);
    };

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    };

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;

        // Basic TODO: Right Click to add a flag on board[x][y]
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end
        if (newBoard[x][y].revealed) {
            return;
        } else if (!newBoard[x][y].revealed && !newBoard[x][y].flagged && newFlagNum > 0) {
            // add flag
            newBoard[x][y].flagged = true;
            newFlagNum--;
        } else if (board[x][y].flagged) {
            // remove flag
            newBoard[x][y].flagged = false;
            newFlagNum++;
        }
        setBoard(newBoard);
        setRemainFlagNum(newFlagNum);
    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));
        let newNonMinesCount = revealed(newBoard, x, y, nonMineCount).newNonMinesCount;
        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.

        if (board[x][y].value === "💣") {
            setGameOver(true);
        } else {
            console.log(nonMineCount);
            console.log(remainFlagNum);
            if (nonMineCount === 1 && remainFlagNum === 0) {
                setWin(true);
            }
        }
        setBoard(newBoard);
        setNonMineCount(newNonMinesCount);
    };

    return (
        <div className="boardPage">
            <div className="boardWrapper">
                {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}
                {/* Basic TODO: Implement Board 
                Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
                <div className="boardContainer">
                    <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver} />
                    {board.map((row) => (
                        <div key={`row${row[0].x}`} id={`row${row[0].x}`} style={{ display: "flex" }}>
                            {row.map((cell) => (
                                <Cell
                                    key={`${cell.x}-${cell.y}`}
                                    id={`${cell.x}-${cell.y}`}
                                    rowIdx={cell.x}
                                    colIdx={cell.y}
                                    detail={cell}
                                    updateFlag={updateFlag}
                                    revealCell={revealCell}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Board;
