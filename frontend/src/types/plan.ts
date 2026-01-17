export interface User {
    id: number;
    name: string;
}

export interface Plan {
    id: number;
    name: string;
    window_seconds: number;
    limit: number;
    createdAt?: string;   // ISO string
    updatedAt?: string;   // ISO string
    users: User[];
}