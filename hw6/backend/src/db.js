import mongoose from "mongoose";

export default {
    connect: () => {
        /* code to connect Mongoose DB */
        const db = mongoose.connection;
        db.on("error", (err) => console.log(err));
        db.once("open", async () => {
			console.log("db opened!");
            await deleteDB();
        });
    },
};
