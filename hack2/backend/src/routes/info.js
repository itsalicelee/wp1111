// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info';

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter;
    const mealFilter = req.query.mealFilter;
    const typeFilter = req.query.typeFilter;
    const sortBy = req.query.sortBy;
    /****************************************/

    // NOTE Hint:
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success,
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })`

    // TODO Part I-3-a: find the information to all restaurants
    let priceCondition = [];
    let mealCondition = [];
    let typeCondition = [];
    const sortCondition = sortBy === 'price' ? { price: 1 } : { distance: 1 };

    if (priceFilter !== undefined) {
        for (let i = 0; i < priceFilter.length; i++) {
            if (priceFilter[i] === '$') {
                priceCondition.push({ price: 1 });
            } else if (priceFilter[i] === '$$') {
                priceCondition.push({ price: 2 });
            } else if (priceFilter[i] === '$$$') {
                priceCondition.push({ price: 3 });
            }
        }
    }

    if (mealFilter !== undefined) {
        for (let i = 0; i < mealFilter.length; i++) {
            mealCondition.push({ tag: mealFilter[i] });
        }
    }
    if (typeFilter !== undefined) {
        for (let i = 0; i < typeFilter.length; i++) {
            typeCondition.push({ tag: typeFilter[i] });
        }
    }
    console.log(priceCondition);
    console.log(mealCondition);
    console.log(typeCondition);

    if (
        priceCondition.length === 0 &&
        mealCondition.length === 0 &&
        typeCondition.length === 0
    ) {
        // return all
        Info.find({})
            .sort(sortCondition)
            .exec((err, data) => {
                if (err) {
                    res.status(403).send({ message: 'error', contents: err });
                } else {
                    res.status(200).send({ message: 'success', contents: data });
                }
            });
    } else {
        const query = [];
        if (priceCondition.length !== 0) {
            query.push({ $or: priceCondition });
        }
        if (mealCondition.length !== 0) {
            query.push({ $or: mealCondition });
        }
        if (typeCondition.length !== 0) {
            query.push({ $or: typeCondition });
        }
        // query with condition

        Info.find({
            $and: query,
        })
            .sort(sortCondition)
            .exec((err, data) => {
                if (err) {
                    res.status(403).send({ message: 'error', contents: err });
                } else {
                    console.log(data);
                    res.status(200).send({ message: 'success', contents: data });
                }
            });
    }

    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
};

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id;
    /****************************************/
    Info.find({ id: id }).exec((err, data) => {
        if (err) {
            res.status(403).send({ message: 'error', contents: [] });
        } else {
            console.log(data);
            res.status(200).send({ message: 'success', contents: data });
        }
    });
    // NOTE USE THE FOLLOWING FORMAT. Send type should be
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
};
