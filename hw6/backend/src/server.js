import express from "express";
import cors from "cors";
import dotenv from "dotenv-defaults";
import db from "./db";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
db.connect();
