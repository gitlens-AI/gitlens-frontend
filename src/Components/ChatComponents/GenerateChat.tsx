import "./ChatComponents.scss";
import "highlight.js/styles/atom-one-dark.css";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import { Context } from "../../main";
import { generateCode } from "../../API/AiAPI";
import useAuthenticatedRequest from "../../Hooks/useAuthenticatedRequest";
import { useWallet } from "@solana/wallet-adapter-react";

const GenerateChat = observer(() => {
    const {
        generationMessages,
        addGenerationMessage,
        clearGenerationMessages,
        removeLastGenerationMessage,
        setGlobalLoading,
        setGenerationResult,
    } = useContext(Context);
    const { makeRequest, isLoading } = useAuthenticatedRequest();
    const { wallet } = useWallet();
    const [message, setMessage] = useState("");

    const sendHandler = async () => {
        if (message) {
            if (!wallet) {
                alert("Connect wallet first");
                return;
            }

            const isNew = generationMessages.length === 0;
            setMessage("");
            addGenerationMessage(message);

            setGlobalLoading(true);
            const result = await makeRequest(generateCode, message, isNew);
            if (result) {
                if (result.ok) {
                    setGenerationResult(result.data);
                } else {
                    alert(result.message);
                    removeLastGenerationMessage();
                }
            }
            setGlobalLoading(false);
        }
    };

    const newChatHandler = () => {
        clearGenerationMessages();
        setGenerationResult(null);
    };

    return (
        <div className="chat-container discussion-chat">
            <div className="messages-container">
                {generationMessages.map((message, index) => {
                    return (
                        <pre className="message-item" key={index}>
                            {message}
                        </pre>
                    );
                })}
            </div>
            {generationMessages.length > 0 && (
                <button className="copy-btn" onClick={newChatHandler}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="#b47eff"
                        className="bi bi-chat-right-text"
                        viewBox="0 0 16 16"
                    >
                        <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                    </svg>
                </button>
            )}

            {((import.meta.env.VITE_ENABLE_CONTEXT !== "true" && generationMessages.length === 0) ||
                import.meta.env.VITE_ENABLE_CONTEXT === "true") && (
                <div className="input-container">
                    <textarea
                        placeholder="Write something"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <button
                        className={"send-btn" + (isLoading ? " disabled" : "")}
                        onClick={isLoading ? undefined : sendHandler}
                    >
                        <span>Send</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 20V4L22 12L3 20ZM5 17L16.85 12L5 7V10.5L11 12L5 13.5V17ZM5 17V12V7V10.5V13.5V17Z"
                                fill="#1D1B20"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
});

export default GenerateChat;
