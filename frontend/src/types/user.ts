export interface Usage {
    id: number;
    used: number;
}

export interface User {
    id: number;
    name: string;
    plan: {
        id: number,
        name: string,
        limit: number
    };
    usages: Usage[];
}