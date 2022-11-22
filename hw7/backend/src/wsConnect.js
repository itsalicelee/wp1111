import { UserModel, MessageModel, ChatBoxModel } from './models/chatbox';

// 在 global scope 將 chatBoxes 宣告成空物件
// const chatBoxes = {};
// // 如果不曾有過 chatBoxName 的對話，將 chatBoxes[chatBoxName] 設定為 empty Set
// if (!chatBoxes[chatBoxName])
//     chatBoxes[chatBoxName] = new Set(); // make new record for chatbox
// 將 ws client 加入 chatBoxes[chatBoxName] chatBoxes[chatBoxName].add(ws); // add this open connection into chatbox

const makeName = (name, to) => {
    return [name, to].sort().join('_');
};

const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box) box = await new ChatBoxModel({ name, users: participants }).save();
    return box.populate(['users', { path: 'messages', populate: 'sender' }]);
};

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
        console.log('=====onMessage=====');
        const { data } = byteString;
        const { type, payload } = JSON.parse(data);
        console.log('type: ', type);
        console.log('payload: ', payload);
        
        switch (type) {
            case 'login': {
                const username = payload.name;
                console.log(`Finding...${username}`);
                const existing = await UserModel.findOne({ name: username });
                if (!existing) {
                    // user does not exist, create the user
                    const newUser = new UserModel({
                        name: username,
                    });
                    await newUser.save();
                    console.log(`New User ${username} saved!`);
                }
                broadcastMessage(
                    wss,
                    ['login', payload],
                    {
                        type: 'success',
                        msg: 'Logged in successfully.',
                    }
                );
                break;
            }

            case 'input': {
                const { name, to, body } = payload;
                console.log(name, to, body);
                const sender = await UserModel.findOne({ name: name });
                const chatBox = await ChatBoxModel.findOne({ name: makeName(name, to) });
                // Save payload to DB
                const message = new MessageModel({
                    chatBox: chatBox._id,
                    sender: sender._id,
                    body: body,
                });
                await message.save();
                console.log('message saved!');

                // Respond to client
                broadcastMessage(
                    wss,
                    ['backToSender', payload],
                    {
                        type: 'success',
                        msg: 'Message sent.',
                    }
                );
                break;
            }
            case 'chat': {
                // start a new chatbox
                const { name, to } = payload;
                try {
                    const existing = await ChatBoxModel.findOne({
                        name: makeName(name, to),
                    });
                    if (!existing) {
                        const newChatbox = new ChatBoxModel({ name: makeName(name, to) });
                        await newChatbox.save();
                        console.log('new chatbox saved!');
                    }
                    broadcastMessage(
                        wss,
                        ['init', payload],
                        {
                            type: 'success',
                            msg: 'Chat created.',
                        }
                    );
                } catch (e) {
                    throw new Error('Chatbox save error:' + e);
                }

                break;
            }
            // case 'clear': {
            //     MessageModel.deleteMany({}, () => {
            //         broadcastMessage(wss, ['cleared'], {
            //             type: 'info',
            //             msg: 'Message cache cleared.',
            //         });
            //     });
            //     break;
            // }
        }
    },
};
