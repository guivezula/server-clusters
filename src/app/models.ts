export interface AppItem {
    id: string;
    name: string;
    createdAt?: Date;
}

export interface ServerItem {
    apps: AppItem[];
}
