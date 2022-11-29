/****************************************************************************
  FileName      [ information.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the information of restaurant ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from 'react';
import Stars from '../components/stars';
import '../css/restaurantPage.css';

const Information = ({ info, rating }) => {
    const getTag = (tags) => {
        return (
            <>
                {/* TODO Part III-2-a render tags */}
                {tags.map((e) => (
                    <div className='tag' key={e}>
                        {e}
                    </div>
                ))}
            </>
        );
    };
    const getPriceTag = (price) => {
        let priceText = '';
        for (let i = 0; i < price; i++) priceText += '$';
        return (
            <>
                {/* TODO Part III-2-a render price tags; hint: convert price number to dollar signs first */}
                <div className='tag' key={priceText}>
                    {priceText}
                </div>
            </>
        );
    };

    const getBusiness = (time) => {
        const mon = time.Mon !== undefined ? time.Mon : 'Closed';
        const tue = time.Tue !== undefined ? time.Tue : 'Closed';
        const wed = time.Wed !== undefined ? time.Wed : 'Closed';
        const thu = time.Thr !== undefined ? time.Thr : 'Closed';
        const fri = time.Fri !== undefined ? time.Fri : 'Closed';
        const sat = time.Sat !== undefined ? time.Sat : 'Closed';
        const sun = time.Sun !== undefined ? time.Sun : 'Closed';

        return (
            <div className='businessTime'>
                {/* TODO Part III-2-c: render business time for each day*/}
                <div className='singleDay'>
                    <div className='day'>Mon</div>
                    <div className='time'>{mon}</div>
                </div>
                <div className='singleDay'>
                    <div className='day'>Tue</div>
                    <div className='time'>{tue}</div>
                </div>
                <div className='singleDay'>
                    <div className='day'>Wed</div>
                    <div className='time'>{wed}</div>
                </div>
                <div className='singleDay'>
                    <div className='day'>Thr</div>
                    <div className='time'>{thu}</div>
                </div>
                <div className='singleDay'>
                    <div className='day'>Fri</div>
                    <div className='time'>{fri}</div>
                </div>
                <div className='singleDay'>
                    <div className='day'>Sat</div>
                    <div className='time'>{sat}</div>
                </div>
                <div className='singleDay'>
                    <div className='day'>Sun</div>
                    <div className='time'>{sun}</div>
                </div>
            </div>
        );
    };

    return (
        <div className='infoContainer'>
            <h2>{info.name}</h2>
            <div className='infoRow'>
                <div className='rate'>
                    {rating === 0 ? (
                        <p>No Rating</p>
                    ) : (
                        <Stars rating={rating} displayScore={true} />
                    )}
                </div>
                <div className='distance'>{info.distance / 1000} km</div>
            </div>
            <div className='infoRow'>
                {getPriceTag(info.price)}
                {getTag(info.tag)}
            </div>
            <h5>Business hours:</h5>
            {getBusiness(info.time)}
        </div>
    );
};
export default Information;
