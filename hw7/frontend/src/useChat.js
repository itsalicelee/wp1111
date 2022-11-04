import { useState } from 'react';

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const sendMessage = (msg) => {
        // TODO: update messages and status
        setMessages([...msg.body]);
        setStatus({
            type: 'success',
            msg: 'Message sent.',
        });
        
    };
    return { messages, status, sendMessage };
};

export default useChat;
