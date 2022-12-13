import server from './server';
import mongo from './mongo';

mongo.connect();

const port = process.env.PORT | 5001;
server.listen({ port }, () => {
    console.log(`The server is up on port ${port}!`);
});
