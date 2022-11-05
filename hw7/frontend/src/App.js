import { useState, useEffect } from 'react';
import './App.css';
import { Button, Input, message, Tag } from 'antd';
import useChat from './useChat';

function App() {
    const { status, messages, sendMessage } = useChat();
    const [username, setUsername] = useState(''); 
    const [body, setBody] = useState('');

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
        displayStatus(status);
    }, [status]);
    useEffect(() => {
        console.log(messages);
    }, [messages]);
    return (
        <div className='App'>
            <div className='App-title'>
                <h1>Simple Chat</h1>
                <Button type='primary' danger>
                    Clear
                </Button>
            </div>
            <div className='App-messages'>
                {messages.length === 0 ? (
                    <p style={{ color: '#ccc' }}>No messages...</p>
                ) : (
                    messages.map(({ name, body }, i) => (
                        <p className='App-message' key={i}>
                            <Tag color='blue'>{name}</Tag>
                            {body}
                        </p>
                    ))
                )}
            </div>
            <Input
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ marginBottom: 10 }}
            ></Input>
            <Input.Search
                value={body}
                onChange={(e) => setBody(e.target.value)}
                onSearch={(msg) => {
                    sendMessage({ name: username, body: msg });
                    setBody('');
                }}
                enterButton='Send'
                placeholder='Type a message here...'
            ></Input.Search>
        </div>
    );
}

export default App;
