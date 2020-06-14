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

  public appsCounter: {[appId: string]: number} = {};

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
    this.servers.unshift({ apps: [] });
  }

  public removeServer() {
    if (!this.servers.length) { return; }
    const deleted = this.servers.splice(0, 1);
    const emptyClusters = this.servers
      .filter(item => !item.apps.length);
    if (!emptyClusters || !emptyClusters.length) {
      return;
    }
    if (deleted[0].apps.length > 0) {
      deleted[0].apps.forEach(app => this.addApp(app));
    }
  }

  public addApp(app: AppItem) {
    if (this.isAllAtLeast(2)) { return; }
    if (!this.isAllAtLeast(1)) {
      this.servers.forEach((value, index) => {
        if (!value.apps.length) {
          this.servers[index].apps.push({
            ...app,
            createdAt: new Date(),
          });
          return;
        }
      });
      // // tslint:disable-next-line:prefer-for-of
      // for (let index = 0; index < this.servers.length; index++) {
      //   const server = this.servers[index];
      //   if (!server.apps.length) {
      //     this.servers[index].apps.push({
      //       ...app,
      //       createdAt: new Date(),
      //     });
      //     break;
      //   }
      // }
    }
    if (this.isAllAtLeast(1)) {
      this.servers.forEach((value, index) => {
        if (value.apps.length === 1) {
          this.servers[index].apps.push({
            ...app,
            createdAt: new Date(),
          });
          return;
        }
      });
    }
    this.appsCounter[app.id] += 1;
  }

  public removeApp(app: AppItem) {
    const lastAddedApps: { createdAt: Date, aIndex: number, sIndex: number }[] = [];
    this.servers.forEach((server, sIndex) => {
      server.apps.forEach((value, aIndex) => {
        if (app.id === value.id) {
          lastAddedApps.push({
            aIndex,
            sIndex,
            createdAt: value.createdAt,
          });
        }
      });
    });
    const lastIndex =  lastAddedApps.sort((a, b) => (b.createdAt as any) - (a.createdAt as any))[0];
    this.servers[lastIndex.sIndex].apps.splice(lastIndex.aIndex, 1);
    this.appsCounter[app.id] -= 1;
  }

  private isAllAtLeast(like: number): boolean {
    for (const server of this.servers) {
      if (server.apps.length < like) {
        return false;
      }
    }
    return true;
  }

  private initServers() {
    for (let i = 0; i < this.MIN_SERVERS; i++) {
      this.servers.push({
        apps: []
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
