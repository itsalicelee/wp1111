import mongoose from 'mongoose';
import { dataInit } from './upload.js';

import 'dotenv-defaults/config.js';

mongoose.set('strictQuery', true);

async function connect() {
    // TODO 1 Connect to your MongoDB and call dataInit()
    mongoose
        .connect(
            process.env.MONGO_URL,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            }
            // TODO Part I-3: connect the backend to mongoDB
        )
        .then(async (res) => {

            dataInit();
        });
    // TODO 1 End
}

export default { connect };
