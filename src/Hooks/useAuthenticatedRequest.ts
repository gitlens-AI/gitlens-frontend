import { useContext, useState } from "react";
import { regenerateJWT } from "../API/AuthAPI";
import { useWallet } from "@solana/wallet-adapter-react";
import { Context } from "../main";

type CallbackReturnType<T> = Promise<T | boolean>;
type CallbackFunction<T> = (...args: any[]) => CallbackReturnType<T>;

const useAuthenticatedRequest = () => {
    const { wallet } = useWallet();
    const { setAccessToken } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    const makeRequest = async <T>(request: CallbackFunction<T>, ...args: any[]) => {
        try {
            setIsLoading(true);
            const result = await request(...args);
            if (typeof result !== "boolean") {
                setIsLoading(false);
                return result;
            } else {
                if (result === true) {
                    const newJWTResult = await regenerateJWT();
                    if (newJWTResult.ok === true) {
                        setAccessToken(newJWTResult.data);
                        const result = await request(...args);
                        if (typeof result !== "boolean") {
                            setIsLoading(false);
                            return result;
                        }
                    } else {
                        setAccessToken(null);
                        await wallet?.adapter.disconnect();
                    }
                }
            }
            setIsLoading(false);
            return null;
        } catch (e: unknown) {
            console.error(e);
            setIsLoading(false);
            return null;
        }
    };

    return { makeRequest, isLoading };
};

export default useAuthenticatedRequest;
