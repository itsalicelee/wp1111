import { Router } from "express";
import ScoreCard from "../models/ScoreCard";

const router = Router();
router.delete("/cards", (req, res) => {
    res.send("Received a DELETE HTTP method");
});

router.post("/card", (req, res) => {
    res.send("Received a POST HTTP method");
});

router.get("/cards", (req, res) => {
    res.send("Received a GET HTTP method");
});

export default router;
