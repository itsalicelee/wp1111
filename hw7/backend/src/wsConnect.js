import Message from './models/message';
import { MessageModel, UserModel, ChatBoxModel } from './models/chatbox';

const makeName = (name, to) => {
    return [name, to].sort().join('_');
};

const validateUser = async (name) => {
    console.log(`Finding...${name}`);
    const existing = await UserModel.findOne({ name });
};

// TODO: validate checkbox

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
};
const sendStatus = (payload, ws) => {
    sendData(['status', payload], ws);
};

const broadcastMessage = (wss, data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    });
};

export default {
    // object key: initData, onMessage
    initData: (ws) => {
        Message.find()
            .sort({ created_at: -1 })
            .limit(100)
            .exec((err, res) => {
                if (err) throw err;
                // initialize app with existing messages
                sendData(['init', res], ws);
            });
    },
    onMessage: (wss) => async (byteString) => {
        console.log('here!!!');
        const { data } = byteString;
        console.log(data);
        const { type, payload } = JSON.parse(data);
        console.log(type, payload);
        switch (type) {
            case 'input': {
                const { name, body } = payload;
                console.log(name, body);
                // Save payload to DB
                const message = new Message({ name, body });
                try {
                    await message.save();
                } catch (e) {
                    throw new Error('Message DB save error: ' + e);
                }
                // Respond to client
                broadcastMessage(wss, ['output', [payload]], {
                    type: 'success',
                    msg: 'Message sent.',
                });
                break;
            }
            case 'clear': {
                Message.deleteMany({}, () => {
                    broadcastMessage(wss, ['cleared'], {
                        type: 'info',
                        msg: 'Message cache cleared.',
                    });
                });
                break;
            }
        }
    },
};
