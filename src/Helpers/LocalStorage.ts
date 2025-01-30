const ACCESS_TOKEN_KEY = "accessToken";

export const getLocalAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
};
export const setLocalAccessToken = (token: string | null) => {
    if (token) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } else {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
};
