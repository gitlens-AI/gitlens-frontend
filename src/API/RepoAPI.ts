import { AxiosError } from "axios";
import { $host } from ".";
import { BasicResponse, RepositoryType } from "../Helpers/Types";

export const getLastRepos = async (): Promise<BasicResponse<RepositoryType[]> | boolean> => {
    try {
        const { data } = await $host.get("/repo/last");

        if (data) {
            return { ok: true, message: "got response", data: data };
        }
        return {
            ok: false,
            message: "can't get data",
            data: null,
        };
    } catch (e: unknown) {
        let message = "Some error";
        if (e instanceof AxiosError && e.response) {
            if (e.response.status === 403) {
                return true;
            }

            if (e.response?.data.message === "no whitelist") {
                message = "You are not in whitelist";
            }
            return { ok: false, message, data: null };
        }
        return { ok: false, message, data: null };
    }
};
