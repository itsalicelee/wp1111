import http from 'http';
import express from 'express';
import dotenv from 'dotenv-defaults'
import mongoose from 'mongoose';
import mongo from './mongo'
import WebSocket from 'ws';
import wsConnect from './wsConnect'

mongo.connect();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const db = mongoose.connection;


db.once('open', () => { 
	console.log("MongoDB connected!"); 
	wss.on('connection', (ws) => {
		// ws is Client-side web socket object
		ws.onmessage = wsConnect.onMessage(ws);
		// wsConnect.initData(ws);
		// ws.onmessage = wsConnect.onMessage(wss,ws);

	});
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => { 
	console.log(`Listening on http://localhost:${PORT}`);
 });