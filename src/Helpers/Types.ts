export type BasicResponse<T> = {
    ok: boolean;
    message: string;
    data: T | null;
};

export type RepositoryType = {
    id: number;
    author: string;
    name: string;
    checkedTimes: number;
    score: number;
};
