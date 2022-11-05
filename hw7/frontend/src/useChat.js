import { useState } from 'react';

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});

    const client = new WebSocket('ws://localhost:4000');
    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
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
            default:
                break;
        }
    };
    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };

    const sendMessage = (payload) => {
        sendData(['input', payload]);
        /* Fake messages for testing frontend */
        // setMessages([...messages, payload]);
        // setStatus({
        //     type: 'success',
        //     msg: 'Message sent.',
        // });
    };

    // web socket client

    return { messages, status, sendMessage };
};

export default useChat;
