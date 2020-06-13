import { Injectable } from '@angular/core';
import { ServerItem } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class Service {

  private readonly MIN_CLUSTERS = 4;
  private readonly MAX_APPS = 2;
  private servers: ServerItem[] = [];

  constructor() {
    this.initClusters();
  }

  public addServer() {
    this.servers.unshift({ type: 'empty' });
  }

  public getServerList() {
    return this.servers;
  }

  private initClusters() {
    for (let i = 0; i < this.MIN_CLUSTERS; i++) {
      this.servers.push({
        type: 'empty',
      });
    }
  }
}
