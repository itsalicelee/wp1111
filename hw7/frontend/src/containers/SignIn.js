import AppTitle from '../components/Title';
import LogIn from '../components/Login';
import { useChat } from './hooks/useChat';

const SignIn = ({ me }) => {
    const { setMe, setSignedIn, displayStatus } = useChat();

    const handleLogin = (name) => {
        if (!name)
            displayStatus({
                type: 'error',
                msg: 'Missing username',
            });
        else setSignedIn(true);
    };

    return (
        <>
            <AppTitle />
            <LogIn me={me} setName={setMe} onLogin={handleLogin} />
        </>
    );
};

export default SignIn;
