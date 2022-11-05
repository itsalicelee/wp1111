import Message from './models/message';

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
};
const sendStatus = (payload, ws) => {
    sendData(['status', payload], ws);
};

export default {
    onMessage: (ws) => async (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
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
                sendData(['output', [payload]], ws);
                sendStatus({ type: 'success', msg: 'Message sent.' }, ws);
                break;
            }
        }
    },
};
