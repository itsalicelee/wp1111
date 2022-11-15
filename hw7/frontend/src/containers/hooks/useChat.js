import { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';

const LOCALSTORAGE_KEY = 'save-me';
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},
    me: '',
    signedIn: false,
    messages: [],
    startChat: () => {},
    sendMessage: () => {},
    clearMessages: () => {},
    displayStatus: () => {},
});
const client = new WebSocket('ws://localhost:4000');
client.onopen = () => console.log('Backend socket server connected!');

const ChatProvider = (props) => {
    const [status, setStatus] = useState({});
    const [messages, setMessages] = useState([]);
    const [me, setMe] = useState(savedMe || '');
    const [signedIn, setSignedIn] = useState(false);
    client.onmessage = (byteString) => {
        console.log('here!');
        const { data } = byteString;
        const [type, payload] = JSON.parse(data);
        console.log(data);
        console.log(type, payload);
        switch (type) {
            case 'init': {
                setMessages(payload);
                break;
            }
            case 'output': {
                // received from server
                setMessages(() => [...messages, ...payload]);
                break;
            }
            case 'status': {
                // received from Server
                // console.log(payload); // {type: 'success', msg: 'Message sent.'}
                setStatus(payload);
                break;
            }
            case 'cleared': {
                setMessages([]);
                break;
            }
            default:
                break;
        }
    };
    const sendData = async (data) => {
        console.log(data);
        await client.send(JSON.stringify(data));
    };

    const startChat = (name, to) => {
        if (!name || !to) throw new Error('Name or to required!');
        sendData({ type: 'CHAT', payload: { name, to } });
    };

    // const clearMessages = () => {
    //     sendData(['clear']);
    // };
    // const sendData = async (data) => {
    //     await client.send(JSON.stringify(data));
    // };

    const sendMessage = ({ name, to, body }) => {
        console.log(name, to, body);
        if (!name || !to || !body) throw new Error('name or to or body required');
        sendData({
            type: 'input',
            payload: { name, to, body },
        });
        /* Fake messages for testing frontend */
        // setMessages([...messages, payload]);
        // setStatus({
        //     type: 'success',
        //     msg: 'Message sent.',
        // });
    };

    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s;
            const content = { content: msg, duration: 0.5 };
            switch (type) {
                case 'success':
                    message.success(content);
                    break;
                case 'error':
                default:
                    message.error(content);
                    break;
            }
        }
    };

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [signedIn]);
    // web socket client
    // return object
    return (
        <ChatContext.Provider
            value={{
                status,
                messages,
                me,
                setMe,
                signedIn,
                setSignedIn,
                sendMessage,
                displayStatus,
            }}
            {...props}
        />
    );
};

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };
