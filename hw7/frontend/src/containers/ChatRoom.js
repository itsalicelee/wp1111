import { useState, useEffect, useRef } from 'react';
import './App.css';
import styled from 'styled-components';
import { Button, Input, message, Tag, Tabs } from 'antd';
import { useChat } from './hooks/useChat';
import Title from '../components/Title';
import Message from '../components/Message';
import ChatModal from '../components/ChatModal';

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`;

const ChatBoxWrapper = styled.div`
    height: calc(240px-36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const FootRef = styled.div`
    height: 20px;
`;

const ChatRoom = () => {
    const { status, me, messages, sendMessage, clearMessages, startChat } = useChat();
    const [chatBoxes, setChatBoxes] = useState([]); // {label, children , key}
    const [activeKey, setActiveKey] = useState('');
    const [username, setUsername] = useState('');
    const [body, setBody] = useState('');
    const bodyRef = useRef(null);
    const [msgSent, setMsgSent] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const msgRef = useRef(null);
    const msgFooter = useRef(null);

    // const displayMessages = () =>
    //     messages.length === 0 ? (
    //         <p style={{ color: '#ccc' }}>No messages...</p>
    //     ) : (
    //         messages.map(({ name, body }, i) => (
    //             <Message name={name} isMe={name === me} message={body} key={i} />
    //         ))
    //     );

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
    const extractChat = (friend) => {
        return renderChat(
            messages.filter(({ name, body }) => name === friend || name === me)
        );
    };

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    useEffect(() => {
        scrollToBottom();
        setMsgSent(false);
    }, [msgSent]);

    useEffect(() => {
        const chat = extractChat(activeKey);
        setChatBoxes([{ label: activeKey, children: chat, key: activeKey }]);
    }, [messages]);

    const renderChat = (chat) => {
        console.log(chat.length);
        return chat.length === 0 ? (
            <p style={{ color: '#ccc' }}>No messages...QQ </p>
        ) : (
            chat.map(({ name, body }, i) => (
                <Message name={name} isMe={name === me} message={body} key={i} />
            ))
        ); // 產生 chat 的 DOM nodes
    };

    const createChatBox = (friend) => {
        if (chatBoxes.some(({ key }) => key === friend)) {
            throw new Error(friend + "'s chat box has already opened.");
        }
        const chat = extractChat(friend);
        setChatBoxes([...chatBoxes, { label: friend, children: chat, key: friend }]);
        setUsername(friend);
        setMsgSent(true);
        return friend;
    };

    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({ key }) => key === activeKey);
        const newChatBoxes = chatBoxes.filter(({ key }) => key !== targetKey);
        setChatBoxes(newChatBoxes);
        return activeKey
            ? activeKey === targetKey
                ? index === 0
                    ? ''
                    : chatBoxes[index - 1].key
                : activeKey
            : '';
    };

    return (
        <>
            <Title name={me} />
            <ChatBoxesWrapper
                tabBarStyle={{ height: '36px' }}
                type='editable-card'
                activeKey={activeKey}
                onChange={(key) => {
                    setActiveKey(key);
                    extractChat(key);
                }}
                onEdit={(targetKey, action) => {
                    if (action === 'add') setModalOpen(true);
                    else if (action === 'remove') {
                        setActiveKey(removeChatBox(targetKey, activeKey));
                    }
                }}
                items={chatBoxes}
            />

            <ChatModal
                setActiveKey={setActiveKey}
                open={modalOpen}
                onCreate={({ name }) => {
                    setActiveKey(createChatBox(name));
                    startChat(me, activeKey);
                    setModalOpen(false);
                }}
                onCancel={() => {
                    setModalOpen(false);
                }}
            />
            <Input.Search
                ref={msgRef} // change focus!
                value={body}
                onChange={(e) => setBody(e.target.value)}
                enterButton='Send'
                placeholder='Type a message here...'
                onSearch={(msg) => {
                    if (!msg || !username) {
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter a username and a message body.',
                        });
                        return;
                    } else if (activeKey === '') {
                        displayStatus({
                            type: 'error',
                            msg: 'Please add a chatbox first.',
                        });
                        setBody('');
                        return;
                    }

                    sendMessage({ name: me, to: username, body: msg });
                    setBody('');
                    setMsgSent(true);
                    extractChat(username);
                }}
            ></Input.Search>
        </>
    );
};

export default ChatRoom;
