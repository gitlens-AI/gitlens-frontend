import "./ChatComponents.scss";
import "highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js";
import Editor from "react-simple-code-editor";
import { validateCode } from "../../API/AiAPI";
import { useContext } from "react";
import useAuthenticatedRequest from "../../Hooks/useAuthenticatedRequest";
import { Context } from "../../main";
import { observer } from "mobx-react";

const ValidateChat = observer(() => {
    const { makeRequest, isLoading } = useAuthenticatedRequest();
    const { setGlobalLoading, setValidationResult, validationCode, setValidationCode } = useContext(Context);

    const sendAIRequest = async () => {
        if (!isLoading) {
            setGlobalLoading(true);
            const result = await makeRequest(validateCode, validationCode);
            if (result) {
                if (result.ok) {
                    setValidationResult(result.data);
                } else {
                    alert(result.message);
                }
            }
            setGlobalLoading(false);
        }
    };

    const highlightCode = (code: string) => {
        const detectedLanguage = hljs.highlightAuto(code);
        return detectedLanguage.value;
    };

    return (
        <div className="chat-container validate-chat">
            <Editor
                className="editor-container"
                value={validationCode}
                onValueChange={(newCode) => setValidationCode(newCode)}
                highlight={highlightCode}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                    fontWeight: 600,
                    height: "100%",
                    maxHeight: "800px",
                    overflow: "scroll",
                }}
                placeholder="Paste your code here"
            />
            <button
                className={"validate-btn" + (isLoading ? " disabled" : "")}
                onClick={isLoading ? undefined : sendAIRequest}
            >
                <span>Validate</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3 20V4L22 12L3 20ZM5 17L16.85 12L5 7V10.5L11 12L5 13.5V17ZM5 17V12V7V10.5V13.5V17Z"
                        fill="#1D1B20"
                    />
                </svg>
            </button>
        </div>
    );
});

export default ValidateChat;
