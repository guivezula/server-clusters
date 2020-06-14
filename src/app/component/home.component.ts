import { Component, OnInit } from '@angular/core';
import { Service } from '../service';
import { ServerItem, AppItem } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public servers: ReadonlyArray<ServerItem>;
  public apps: ReadonlyArray<AppItem>;
  public isLoadingPage: boolean;
  public counter: { [key: string]: number } = {};

  constructor(private service: Service) { }

  public getCounter(appId: string) {

  }

  private getLists() {
    this.isLoadingPage = true;
    setTimeout(() => {
      this.servers = this.service.serverList;
      this.apps = this.service.appList;
      this.counter = this.service.appsCounter;
    }, 1000);
    this.isLoadingPage = false;
  }

  ngOnInit() {
    this.getLists();
  }

}
