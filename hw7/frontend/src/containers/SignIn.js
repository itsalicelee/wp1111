import AppTitle from '../components/Title';
import LogIn from '../components/Login';
import { useChat } from './hooks/useChat';

const SignIn = () => {
    const { me, setMe, setSignedIn, displayStatus, sendData } = useChat();

    const handleLogin = (name) => {
        if (!name)
            displayStatus({
                type: 'error',
                msg: 'Missing username',
            });
        else {
            setSignedIn(true);
            sendData({
                type: 'login',
                payload: { name },
            });
        }
    };

    return (
        <>
            <AppTitle />
            <LogIn me={me} setName={setMe} onLogin={handleLogin} />
        </>
    );
};

export default SignIn;
