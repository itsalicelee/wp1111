/****************************************************************************
  FileName      [ MineSweeper.js ]
  PackageName   [ src/containers ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ The control and main page of MineSweeper. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './MineSweeper.css';
import Board from '../components/Board'
import React, { useState } from 'react';
import HomePage from '../components/HomePage'

const MineSweeper = () => {
    const [startGame, setStartGame] = useState(false);      // A boolean variable. If true, show `Board`, else show `HomePage`.
    const [mineNum, setMineNum] = useState(10);             // A integer variable to store the number of mines in the game. The default value is 10.
    const [boardSize, setBoardSize] = useState(8);          // A integer variable to store the board size in the game. The default value is 8.

    // Basic TODO: Change `startGame` from false to true when this function is called
    const startGameOnClick = () => {
        
    }

    // Advanced TODO: Change `mineNum` to the number you send by this function
    const mineNumOnChange = (value) => {
        
    }

    // Advanced TODO: Change `boardSize` to the number you send by this function
    const boardSizeOnChange = (value) => {
        
    }

    // Advanced TODO: Change `startGame` from true to false when this function is called
    const backToHomeOnClick = () => {
        
    }

    return (
        <div className='mineSweeper'>
            {/* Basic TODO: `HomePage` and `Board` will switch based on the mode of `startGame`. If `startGame` is true, show `Board`; else show `HomePage` */}
            
            {/* Advanced TODO: pass all parameters into `Board` and `HomePage`*/}
            
        </div>
    );
}
export default MineSweeper;