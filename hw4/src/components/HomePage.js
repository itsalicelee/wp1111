/* eslint-disable no-lone-blocks */
/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/HomePage.css";
import React, { useState } from "react";

const HomePage = ({
    startGameOnClick,
    mineNumOnChange,
    boardSizeOnChange,
    mineNum,
    boardSize,
    setMineNum,
    setBoardSize /* -- something more... -- */,
}) => {
    const [showPanel, setShowPanel] = useState(false); // A boolean variable. If true, the controlPanel will show.
    const [error, setError] = useState(false); // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

    /* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */
    const hasError = (mineNum, boardSize) => {
        return mineNum > boardSize * boardSize;
    };

    function handlMineOnChange(event) {
        mineNumOnChange(event.target.value);
        hasError(mineNum, boardSize) ? setError(true) : setError(false);
    }
    function handleBoardSizeOnChange(event) {
        boardSizeOnChange(event.target.value);
        hasError(mineNum, boardSize) ? setError(true) : setError(false);
    }

    return (
        <div className="HomeWrapper">
            <p className="title">MineSweeper</p>
            {/* Basic TODO:  Implemen start button */}
            <button className="btn" onClick={startGameOnClick} disabled={error ? true : false}>
                Start Game
            </button>
            {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
            <div className="controlContainer">
                <button className="btn" onClick={() => setShowPanel(!showPanel)}>
                    Difficulty Adjustment
                </button>
                <div id="controlWrapper" className="controlWrapper" style={showPanel ? { visibility: "visible" } : { visibility: "hidden" }}>
                    <div className="error" style={(showPanel && error) ? { visibility: "visible" } : { visibility: "hidden" }}>
                        Error: Mines number and board size are invalid!
                    </div>
                    <div className="controlPanel">
                        <div className="controlCol">
                            <p className="controlTitle">Mines Number</p>
                            {/*TODO: adjust min max size */}
                            <input type="range" step="1" min="1" max="100" defaultValue="10" onChange={handlMineOnChange} />
                            <p className="controlNum" style={error ? { color: "#880000" } : { color: "#0f0f4b" }}>
                                {mineNum}
                            </p>
                        </div>
                        <div className="controlCol">
                            <p className="controlTitle">Board Size(n*n)</p>
                            {/*TODO: adjust min max size */}
                            <input type="range" step="1" min="1" max="15" defaultValue="8" onChange={handleBoardSizeOnChange} />
                            <p className="controlNum" style={error ? { color: "#880000" } : { color: "#0f0f4b" }}>
                                {boardSize}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomePage;
