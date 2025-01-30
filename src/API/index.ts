import axios from "axios";

export const $host = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL + "/api",
});
