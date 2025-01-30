import "./index.scss";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createContext } from "react";
import { RootStore } from "./Store/RootStore.tsx";

export const Context = createContext<RootStore>({} as RootStore);

createRoot(document.getElementById("root")!).render(
    <Context.Provider value={new RootStore()}>
        <App />
    </Context.Provider>
);
