export interface AppItem {
    id: string;
    name: string;
}

export interface ServerItem {
    type: 'empty'| 'app';
    app?: AppItem;
    createdAt?: Date;
}
