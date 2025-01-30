export const shortAddress = (address: string) => {
    return address.slice(0, 4) + "..." + address.slice(-4);
};

export const getGithubLink = (author: string, name: string) => {
    return `https://github.com/${author}/${name}`;
};
