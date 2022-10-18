/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import "./css/Board.css";
import React from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess, printTest }) => {
    const numArr = [0, 1, 2, 3, 4, 5];

    return (
        <div className="Board-container">
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
            {numArr.map((num) =>
                turn === num ? (
                    <Row id={`row_${num}`} key={`row_${num}`} guess={guesses[num]} rowIdx={num} />
                ) : (
                    <CurRow id={`row_${num}`} key={`row_${num}`} curGuess={curGuess} rowIdx={num} />
                )
            )}
        </div>
    );
};
export default Board;
