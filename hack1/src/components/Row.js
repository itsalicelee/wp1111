/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from "react";

const Row = ({ guess, rowIdx }) => {
    
    return (
        <div className="Row-container">
            {/* TODO 3: Row Implementation -- Row */}
            <div className="Row-wrapper">
                <div id={`${rowIdx}-0`} key={`${rowIdx}-0`} className={`Row-wordbox `}>
                    {guess[0].char}
                </div>
                <div id={`${rowIdx}-1`} key={`${rowIdx}-1`} className={`Row-wordbox `}>
                    {/* {guess[${rowIdx}][0].char} */}
                    
                </div>
                <div id={`${rowIdx}-2`} key={`${rowIdx}-2`} className={`Row-wordbox `}>
                    
                </div>
                <div id={`${rowIdx}-3`} key={`${rowIdx}-3`} className={`Row-wordbox `}>
                    
                </div>
                <div id={`${rowIdx}-4`} key={`${rowIdx}-4`} className={`Row-wordbox`}>
                    
                </div>
            </div>
            {/* ↓ Default row, you should modify it. ↓ */}
            {/* <div className='Row-wrapper'>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
            </div> */}
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    );
};

export default Row;
