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
  private appsCounter: {[appId: string]: number} = {};

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

  public getCounter(appId: number): number {
    return this.appsCounter[appId];
  }

  public addServer() {
    this.servers.unshift({type: 'empty' });
  }

  public removeServer() {
    if (!this.servers.length) { return; }
    const deleted = this.servers.splice(0, 1);
    if (deleted[0].type === 'app') {
      this.addApp(deleted[0].app);
    }
  }

  public addApp(app: AppItem) {
    if (this.isAtLeast(2)) { return; }
    const emptyClusters = this.servers
      .filter(item => item.type === 'empty');
    if (this.appsCounter[app.id] === this.MAX_APPS) { return; }
    if (!emptyClusters || !emptyClusters.length) {
      this.servers.map(() => ({ type: 'empty' }));
      this.apps.forEach(element => {
        this.appsCounter[element.id] = 0;
      });
      return;
    }
    const newElement: ServerItem = {
      app,
      type: 'app',
      createdAt: new Date(),
    };
    if (!this.isAtLeast(1)) {
      for (let index = 0; index < this.servers.length; index++) {
        const element = this.servers[index];
        if (element.type === 'empty') {
          this.servers[index] = newElement;
          break;
        }
      }
    }
    if (this.isAtLeast(1)) {
      for (let index = 0; index < this.servers.length; index++) {
        const element = this.servers[index];
        if (this.appsCounter[element.app.id] === 1) {
          this.servers.splice(index, 0, newElement);
          break;
        }
      }
      const lastIndex = this.servers.length - 1;
      if (this.servers[lastIndex].type === 'empty') {
        this.servers.splice(lastIndex, 1);
      }
    }
    this.appsCounter[app.id] += 1;
  }

  public removeApp(app: AppItem) {
    const lastAdded = this.servers
      .filter(element => element.app.id === element.app.id)
      .sort((a, b) => (b.createdAt as any) - (a.createdAt as any))[0];
    const lastIndex = this.servers
      .findIndex(item => (
        item.app.id === lastAdded.app.id
        && item.createdAt === item.createdAt
      ));
    this.servers[lastIndex] = ({ type: 'empty' });
    this.appsCounter[app.id] -= 1;
  }

  private isAtLeast(like: number): boolean {
    for (const iterator of this.apps) {
      this.apps.forEach(element => {
        if (this.appsCounter[element.id] < like) {
          return false;
        }
      });
    }
    return true;
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
    this.apps.forEach(element => {
      this.appsCounter[element.id] = 0;
    });
  }
}
