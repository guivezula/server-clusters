import { Injectable } from '@angular/core';
import { ServerItem, AppItem } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class Service {

  private readonly MIN_SERVERS = 4;
  private readonly MAX_APPS = 2;
  private servers: ServerItem[] = [];
  private apps: AppItem[] = [];

  constructor() {
    this.initServers();
  }

  public get serverList(): ReadonlyArray<ServerItem> {
    return this.servers;
  }

  public get appList(): ReadonlyArray<AppItem> {
    return this.apps;
  }

  public addServer() {
    this.servers.unshift({type: 'empty' });
  }

  public removeServer() {
    const emptyClusters = this.servers
      .filter(item => item.type === 'empty');
    if (!emptyClusters) {
      this.servers.splice(0, 1);
      this.servers.map(() => ({ type: 'empty' }));
    } else  {
      const deleted = this.servers.splice(0, 1);
      if (deleted[0].type !== 'empty') {
        // TODO insert app
      }
    }
  }

  private initServers() {
    for (let i = 0; i < this.MIN_SERVERS; i++) {
      this.servers.push({
        type: 'empty',
      });
    }
  }

}
