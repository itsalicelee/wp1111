import { useState } from 'react';
import './App.css';
import { Button, Input, Tag } from 'antd';
import useChat from './useChat';

function App() {
    const { status, messages, sendMessage } = useChat();
    const [username, setUsername] = useState('');
    const [body, setBody] = useState('');

    return (
        <div className='App'>
            <div className='App-title'>
                <h1>Simple Chat</h1>
                <Button type='primary' danger>
                    Clear
                </Button>
            </div>
            <div className='App-messages'>
                <p style={{ color: '#ccc' }}>No messages...</p>
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
