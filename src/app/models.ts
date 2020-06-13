export interface AppItem {
    id: string;
    name: string;
}

export interface ServerItem {
    type: 'empty'| 'cluster';
    app?: AppItem;
}
