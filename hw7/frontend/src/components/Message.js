import { Tag } from 'antd';
import styled from 'styled-components';

const StyledMessage = styled.div`
    display: flex;
    align-items: center;
    flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};
    margin: 8px 0px;

    & p:first-child {
        margin: 0 5px;
    }

    & p:last-child {
        padding: 2px 5px;
        border-radius: 5px;
        background: #eee;
        color: gray;
        margin: auto 0;
    }
`;

const Message = ({ name, isMe, message }) => {
    return (
        <StyledMessage isMe={isMe}>
            <p>
                <Tag color='blue'>{name}</Tag>
                {message}
            </p>
        </StyledMessage>
    );
};

export default Message;
