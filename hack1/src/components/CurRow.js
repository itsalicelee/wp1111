/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx }) => {
    let letters = curGuess.split('');


    return (
        <div className="Row-container">
            {/* TODO 3: Row Implementation -- CurRow */}

            <div className="Row-wrapper current">
                <div id={`${rowIdx}-0`} key={`${rowIdx}-0`} className={`Row-wordbox filled`}>
                    {letters[0]}
                </div>
                <div id={`${rowIdx}-1`} key={`${rowIdx}-1`} className={`Row-wordbox filled`}>
                    {letters[1]}
                </div>
                <div id={`${rowIdx}-2`} key={`${rowIdx}-2`} className={`Row-wordbox filled`}>
                    {letters[2]}
                </div>
                <div id={`${rowIdx}-3`} key={`${rowIdx}-3`} className={`Row-wordbox filled`}>
                    {letters[3]}
                </div>
                <div id={`${rowIdx}-4`} key={`${rowIdx}-4`} className={`Row-wordbox filled`}>
                    {letters[4]}
                </div>
            </div>
            {/* ↓ Default row, you should modify it. ↓ */}
            {/* <div className='Row-wrapper current'>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
            </div> */}
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    );
}

export default CurRow;
