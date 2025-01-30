import "./ChatComponents.scss";
import "highlight.js/styles/atom-one-dark.css";
import Editor from "react-simple-code-editor";
import { validateRepository } from "../../API/AiAPI";
import { useContext } from "react";
import useAuthenticatedRequest from "../../Hooks/useAuthenticatedRequest";
import { Context } from "../../main";
import { observer } from "mobx-react";
import { getLastRepos } from "../../API/RepoAPI";

const ValidateRepoChat = observer(() => {
    const { makeRequest, isLoading } = useAuthenticatedRequest();
    const { setGlobalLoading, setRepoValidationResult, repoValidationCode, setRepoValidationCode, setLastRepos } =
        useContext(Context);

    const sendAIRequest = async () => {
        if (!isLoading) {
            const match = repoValidationCode.match(/github\.com\/([^/]+)\/([^/]+)/);
            if (!match) {
                alert("Wrong github repository url");
                return;
            }

            setGlobalLoading(true);
            const result = await makeRequest(validateRepository, repoValidationCode);
            if (result) {
                if (result.ok) {
                    setRepoValidationResult(result.data);
                    await updateLastRepos();
                } else {
                    alert(result.message);
                }
            }
            setGlobalLoading(false);
        }
    };

    const updateLastRepos = async () => {
        if (!isLoading) {
            const result = await makeRequest(getLastRepos);
            if (result) {
                if (result.ok && result.data) {
                    setLastRepos(result.data);
                }
            }
        }
    };

    const highlightCode = (code: string) => {
        return code;
    };

    return (
        <div className="chat-container validate-chat one-line">
            <Editor
                className="editor-container"
                value={repoValidationCode}
                onValueChange={(newCode) => setRepoValidationCode(newCode)}
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
                placeholder="Paste github repository URL"
            />
            <button
                className={"validate-btn" + (isLoading ? " disabled" : "")}
                onClick={isLoading ? undefined : sendAIRequest}
            >
                <span>Validate repo</span>
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

export default ValidateRepoChat;
