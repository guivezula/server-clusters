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
    this.initApps();
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
      if (deleted[0].type === 'app') {
        this.addApp(deleted[0].app);
      }
    }
  }

  public addApp(app: AppItem) {
    const emptyClusters = this.servers
      .filter(item => item.type === 'empty');
    if (!!emptyClusters && emptyClusters.length === this.servers.length) {
      this.servers[0] = {
        app,
        type: 'app',
        createdAt: new Date(),
      };
      return;
    }

  }

  private initServers() {
    for (let i = 0; i < this.MIN_SERVERS; i++) {
      this.servers.push({
        type: 'empty',
      });
    }
  }

  private initApps() {
    this.apps = [
      {
        id: 'hd',
        name: 'Hadoop',
      },
      {
        id: 'rl',
        name: 'Rails',
      },
      {
        id: 'ch',
        name: 'Chronos',
      },
      {
        id: 'st',
        name: 'Storm',
      },
      {
        id: 'sp',
        name: 'Spark',
      },
    ];
  }
}
