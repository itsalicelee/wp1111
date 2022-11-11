import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useChat } from './hooks/useChat';
import SignIn from './SignIn';
import ChatRoom from './ChatRoom';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
`;

const App = () => {
    const { status, me, messsage, signedIn, sendMessage, clearMessages, displayStatus } =
        useChat();

    useEffect(() => {
        displayStatus(status);
    }, [status]);

    return <Wrapper>{signedIn ? <ChatRoom /> : <SignIn me={me} />}</Wrapper>;
};

export default App;
