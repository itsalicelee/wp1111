import { Router } from "express";
import ScoreCard from "../models/ScoreCard";

/**TODO: remember async await here!*/
const router = Router();
router.delete("/cards", async (req, res) => {
    try {
        await ScoreCard.deleteMany({});
        res.status(200).send("Database cleared");
        console.log("Database deleted");
    } catch (e) {
        throw new Error("Error deleting database!");
    }
});

router.post("/card", async (req, res) => {
    console.log("Received a POST HTTP method");
    //TODO: it's req.body(for data) not req.query(for parameters)
    console.log(req.body);
    const query = { name: req.body.name, subject: req.body.subject };
    const update = { score: parseInt(req.body.score) };

    try {
        const exists = await ScoreCard.findOne(query).then(async (result) => {
            if (result) {
                console.log("exists!");

                const updated = await ScoreCard.findOneAndUpdate(query, update); // if found an existing {name, subject}
                console.log(updated);

                return res.status(200).send({
                    message: `Updating (${req.body.name}, ${req.body.subject}, ${req.body.score})`,
                    card: true,
                });
            } else {
                const newScoreCard = new ScoreCard({ name: req.body.name, subject: req.body.subject, score: req.body.score });
                console.log("Created Score", newScoreCard);
                newScoreCard.save();
                return res.status(200).send({
                    message: `Adding (${newScoreCard.name}, ${newScoreCard.subject}, ${newScoreCard.score})`,
                    card: true,
                });
            }
        });
    } catch (e) {
        throw new Error("Error updating or adding!");
    }
});

router.get("/cards", async (req, res) => {
    console.log("Received a GET HTTP method");
    //TODO: it's  req.query(for parameters) not req.body(for data)
    const isQueryName = req.query.type === "name" ? true : false;
    const query = req.query.queryString;
    var queryResultArr, queryResultStrArr;
    if (isQueryName) {
        // querying name
        queryResultArr = await ScoreCard.find({ name: query });
        queryResultStrArr = queryResultArr.map((e) => `Found card with name: (${e.name}, ${e.subject}, ${e.score})`);
    } else {
        // querying subject
        queryResultArr = await ScoreCard.find({ subject: query });
        queryResultStrArr = queryResultArr.map((e) => `Found card with subject: (${e.name}, ${e.subject}, ${e.score})`);
    }
    if (queryResultArr.length !== 0) {
        res.send({
            messages: true,
            message: queryResultStrArr,
        });
    } else {
        res.send({
            messages: false,
            message: isQueryName? "Name ": "Subject " + `(${query}) not found!`,
        });
    }
});

export default router;
