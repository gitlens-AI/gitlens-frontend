import "./App.scss";
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { authUser } from "./API/AuthAPI";
import Header from "./Components/Header/Header";
import MainPage from "./Pages/MainPage";
import { getLocalAccessToken, setLocalAccessToken } from "./Helpers/LocalStorage";

function App() {
    const { signMessage, publicKey } = useWallet();

    const signMessageHandler = async () => {
        if (!publicKey || !signMessage) {
            return;
        }
        const message = "Hecker AI authorization message. Time: " + new Date().toISOString();
        const encodedMessage = new TextEncoder().encode(message);
        const signedMessage = await signMessage(encodedMessage);
        const encodedSignedMessage = Array.from(signedMessage);
        const result = await authUser(publicKey.toString(), message, encodedSignedMessage);
        if (result.ok) {
            setLocalAccessToken(result.data);
        } else {
            alert("Error with server connection");
        }
    };

    useEffect(() => {
        if (publicKey) {
            const accessToken = getLocalAccessToken();
            if (!accessToken) {
                signMessageHandler();
            }
        }
    }, [publicKey]);

    return (
        <div className="app-container">
            <Header />
            <MainPage />
        </div>
    );
}

export default App;
