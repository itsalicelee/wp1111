import express from "express";
import { getNumber, genNumber } from "../core/getNumber";

const router = express.Router();
router.post("/start", (_, res) => {
    const ans = genNumber(); // 用亂數產生一個猜數字的 number，存在 memory disabled
    console.log(`Answer is ${ans}`);
    res.json({ msg: `The game has started, answer is ${ans}.` });
});

// 去 (memory) DB 拿答案的數字
// 用 req.query.number 拿到前端輸入的數字
// check if NOT a num or not in range [1,100]
// 如果有問題 =>
// res.status(406).send({ msg: 'Not a legal number.' }) // 如果沒有問題，回傳 status
router.get("/guess", (req, res) => {
    const ans = getNumber();
    const guess = parseInt(req.query.number);
    if (!guess || guess < 1 || guess > 100) {
        res.status(406).send({ msg: "Not a legal number." });
    } else if (guess === ans) {
        res.status(200).send({ msg: "Equal" });
    } else if (guess < ans) {
        res.status(200).send({ msg: `You guess ${guess}, guess bigger!` });
    } else if (guess > ans) {
        res.status(200).send({ msg: `You guess ${guess}, guess smaller!` });
    }
});

router.post("/restart", (_, res) => {
    const ans = genNumber();
    res.json({ msg: `New game! The answer is ${ans}` });
});
export default router;
