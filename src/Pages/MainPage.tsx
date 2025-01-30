import "./MainPage.scss";
import { useState } from "react";
import TabSelector from "../Components/TabSelector/TabSelector";
import AIValidationChat from "../Components/ChatComponents/AIValidationChat";
import ValidateChat from "../Components/ChatComponents/ValidateChat";
import GenerateChat from "../Components/ChatComponents/GenerateChat";
import AIGenerationChat from "../Components/ChatComponents/AIGenerationChat";
import ValidateRepoChat from "../Components/ChatComponents/ValidateRepoChat";
import AIRepoValidationChat from "../Components/ChatComponents/AIRepoValidationChat";
import RepoStatsComponent from "../Components/RepoStatsComponent/RepoStatsComponent";

const TAB_ICONS = [
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M20 14.75C18.48 14.75 17.25 13.52 17.25 12C17.25 10.48 18.48 9.25 20 9.25C21.52 9.25 22.75 10.48 22.75 12C22.75 13.52 21.52 14.75 20 14.75ZM20 10.75C19.31 10.75 18.75 11.31 18.75 12C18.75 12.69 19.31 13.25 20 13.25C20.69 13.25 21.25 12.69 21.25 12C21.25 11.31 20.69 10.75 20 10.75Z"
            fill="white"
        />
        <path
            d="M20 6.75C18.48 6.75 17.25 5.52 17.25 4C17.25 2.48 18.48 1.25 20 1.25C21.52 1.25 22.75 2.48 22.75 4C22.75 5.52 21.52 6.75 20 6.75ZM20 2.75C19.31 2.75 18.75 3.31 18.75 4C18.75 4.69 19.31 5.25 20 5.25C20.69 5.25 21.25 4.69 21.25 4C21.25 3.31 20.69 2.75 20 2.75Z"
            fill="white"
        />
        <path
            d="M20 22.75C18.48 22.75 17.25 21.52 17.25 20C17.25 18.48 18.48 17.25 20 17.25C21.52 17.25 22.75 18.48 22.75 20C22.75 21.52 21.52 22.75 20 22.75ZM20 18.75C19.31 18.75 18.75 19.31 18.75 20C18.75 20.69 19.31 21.25 20 21.25C20.69 21.25 21.25 20.69 21.25 20C21.25 19.31 20.69 18.75 20 18.75Z"
            fill="white"
        />
        <path
            d="M4 14.75C2.48 14.75 1.25 13.52 1.25 12C1.25 10.48 2.48 9.25 4 9.25C5.52 9.25 6.75 10.48 6.75 12C6.75 13.52 5.52 14.75 4 14.75ZM4 10.75C3.31 10.75 2.75 11.31 2.75 12C2.75 12.69 3.31 13.25 4 13.25C4.69 13.25 5.25 12.69 5.25 12C5.25 11.31 4.69 10.75 4 10.75Z"
            fill="white"
        />
        <path
            d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
            fill="white"
        />
        <path
            d="M18 20.75H14C11.58 20.75 10.25 19.42 10.25 17V7C10.25 4.58 11.58 3.25 14 3.25H18C18.41 3.25 18.75 3.59 18.75 4C18.75 4.41 18.41 4.75 18 4.75H14C12.42 4.75 11.75 5.42 11.75 7V17C11.75 18.58 12.42 19.25 14 19.25H18C18.41 19.25 18.75 19.59 18.75 20C18.75 20.41 18.41 20.75 18 20.75Z"
            fill="white"
        />
    </svg>,
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.4 16.6L4.8 12L9.4 7.4L8 6L2 12L8 18L9.4 16.6ZM14.6 16.6L19.2 12L14.6 7.4L16 6L22 12L16 18L14.6 16.6Z"
            fill="white"
        />
    </svg>,
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M19 9L20.25 6.25L23 5L20.25 3.75L19 1L17.75 3.75L15 5L17.75 6.25L19 9ZM11.5 9.5L9 4L6.5 9.5L1 12L6.5 14.5L9 20L11.5 14.5L17 12L11.5 9.5ZM19 15L17.75 17.75L15 19L17.75 20.25L19 23L20.25 20.25L23 19L20.25 17.75L19 15Z"
            fill="white"
        />
    </svg>,
];

const MainPage = () => {
    const [leftSelectedTab, setLeftSelectedTab] = useState(0);
    const [rightSelectedTab, setRightSelectedTab] = useState(0);

    const selectRepoValidationMode = () => {
        setLeftSelectedTab(0);
        setRightSelectedTab(0);
    };

    const selectValidationMode = () => {
        setLeftSelectedTab(1);
        setRightSelectedTab(1);
    };

    const selectGenerationMode = () => {
        setLeftSelectedTab(2);
        setRightSelectedTab(2);
    };

    return (
        <div className="main-page-container">
            <div className="chat-wrap left">
                <div className="chat-menues-container">
                    <TabSelector
                        tabs={["Validate repo", "Validate Code", "Generate Code"]}
                        icons={TAB_ICONS}
                        selectHandlers={[selectRepoValidationMode, selectValidationMode, selectGenerationMode]}
                        selectedTabIndex={leftSelectedTab}
                    />
                </div>
                <div className="chat-body-container">
                    {leftSelectedTab === 0 ? (
                        <ValidateRepoChat />
                    ) : leftSelectedTab === 1 ? (
                        <ValidateChat />
                    ) : (
                        <GenerateChat />
                    )}
                </div>
            </div>

            <div className="chat-wrap right">
                <div className="chat-menues-container">
                    <TabSelector
                        tabs={["Repo result", "Code result", "Gen result"]}
                        icons={TAB_ICONS}
                        selectHandlers={[selectRepoValidationMode, selectValidationMode, selectGenerationMode]}
                        selectedTabIndex={rightSelectedTab}
                    />
                </div>
                <div className="chat-body-container">
                    {leftSelectedTab === 0 ? (
                        <AIRepoValidationChat />
                    ) : leftSelectedTab === 1 ? (
                        <AIValidationChat />
                    ) : (
                        <AIGenerationChat />
                    )}
                </div>
            </div>

            {leftSelectedTab === 0 && <RepoStatsComponent />}
        </div>
    );
};

export default MainPage;
