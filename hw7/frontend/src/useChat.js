import { useState } from 'react';

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const sendMessage = (payload) => {
        // TODO: update messages and status
        setMessages([...messages, {
            name: payload.name,
            body: payload.body
        }]);
        setStatus({
            type: 'success',
            msg: 'Message sent.',
        });
        
    };

    // web socket client
    const client = new WebSocket('ws://localhost:4000');
    const sendData = async(data) => {
        await client.send(JSON.stringify(data));
    }
    return { messages, status, sendMessage };
};

export default useChat;
