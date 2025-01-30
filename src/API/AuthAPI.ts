import { $host } from ".";
import { BasicResponse } from "../Helpers/Types";
import { AxiosError } from "axios";
import { getLocalAccessToken } from "../Helpers/LocalStorage";

export const authUser = async (
    publicKey: string,
    message: string,
    signature: Array<number>
): Promise<BasicResponse<string>> => {
    try {
        const { data } = await $host.post("/auth", {
            publicKey,
            message,
            signature,
        });

        if (data?.accessToken) {
            return { ok: true, message: "got accessToken", data: data.accessToken };
        }
        return {
            ok: false,
            message: "can't get access token",
            data: null,
        };
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            return { ok: false, message: e.response?.data.message, data: null };
        }
        return { ok: false, message: "some error", data: null };
    }
};

export const regenerateJWT = async (): Promise<BasicResponse<string>> => {
    try {
        const { data } = await $host.post(
            "/auth/regenerate",
            {},
            {
                headers: {
                    Authorization: getLocalAccessToken(),
                },
            }
        );
        if (data?.accessToken) {
            return { ok: true, message: "regenerated accessToken", data: data.accessToken };
        }
        return { ok: false, message: "can't regenerate access token", data: null };
    } catch (e: unknown) {
        if (e instanceof AxiosError) {
            console.error(e.message);
        }
        return {
            ok: false,
            message: "some error with JWT regeneration",
            data: null,
        };
    }
};
