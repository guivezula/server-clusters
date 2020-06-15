import { Injectable } from '@angular/core';
import { ServerItem, AppItem } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class Service {

  private readonly MIN_SERVERS = 4;
  private servers: ServerItem[] = [];
  private apps: AppItem[] = [];

  public appsCounter: {[appId: string]: number} = {};

  constructor() {
    this.initServers();
    this.initApps();
  }

  /**
   * Método get para retornar a lista de servidores apenas para leitura
   */
  public get serverList(): ReadonlyArray<ServerItem> {
    return this.servers;
  }

  /** Método get para retornar a lista de apps apenas para leitura */
  public get appList(): ReadonlyArray<AppItem> {
    return this.apps;
  }

  /**
   * Adiciona um servidor vazio na lista de servidores
   */
  public addServer() {
    this.servers.push({ apps: [] });
  }

  /**
   * Remove um servidor na lista e verifica se possui disponibilidade em outro
   * servidor para alocar o(s) app(s), caso exista
   */
  public removeServer() {
    if (!this.servers.length) { return; }
    const deleted = this.servers.pop();
    deleted.apps.forEach(app => this.appsCounter[app.id] -= 1);
    if (deleted.apps.length <= this.serverAvailability() && deleted.apps.length > 0) {
      deleted.apps.forEach(app => this.addApp(app));
      return;
    }
  }

  /**
   * Adiciona um app em um dos servidores obedecendo as regras de negócio
   * @param app é o app em questão que vai ser adicionado ao servidor
   * Se já existe 2 apps executando em cada servidor, a ação não é realizada
   * Se exite um servidor sem nenhuma execução o app é adicionado no mesmo, ou
   * Se existe em todos os servidores pelo menos uma execução, o app é
   * adicionado no primeiro que tenha 1, o contador é incrementado
   */
  public addApp(app: AppItem) {
    if (this.isAllAtLeast(2)) { return; }
    this.appsCounter[app.id] += 1;
    if (!this.isAllAtLeast(1)) {
      for (let index = 0; index < this.servers.length; index++) {
        const server = this.servers[index];
        if (!server.apps.length) {
          this.servers[index].apps.push({
            ...app,
            createdAt: new Date(),
          });
          break;
        }
      }
      return;
    }
    if (this.isAllAtLeast(1)) {
      for (let index = 0; index < this.servers.length; index++) {
        const server = this.servers[index];
        if (server.apps.length === 1) {
          this.servers[index].apps.push({
            ...app,
            createdAt: new Date(),
          });
          break;
        }
      }
      return;
    }
  }

  /**
   * Remove o app mais recente adicionado na lista de servidores
   * @param app é o app a ser removido
   * Se o app da lista de servidores é equivalente ao @param app, o indice
   * do servidor, e o indice do app é adicionado junto com a data de criação
   * O novo array é ordenado por data de criação, selecionando o mais
   * recente (a primeira posição), removendoo app no servidor que o mesmo se
   * encontrava
   */
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

  /**
   * Esse método retorna falso se ainda existe um servidor
   * com o número de apps executando inferior a @param like
   */
  private isAllAtLeast(like: number): boolean {
    for (const server of this.servers) {
      if (server.apps.length < like) {
        return false;
      }
    }
    return true;
  }

  /**
   * Retorna o número de posições disponíveis na lista de servidores
   * Subtrai o máximo disponível de acordo com o tamanho da lista
   * pelo número de servidores já utilizados
   */
  private serverAvailability(): number {
    const availability = this.servers.length * 2;
    let counter = 0;
    this.apps.forEach(app => counter += this.appsCounter[app.id]);
    return availability - counter;
  }

  /**
   * Inicializa o cluster com 4 servidores vazios
   */
  private initServers() {
    for (let i = 0; i < this.MIN_SERVERS; i++) {
      this.servers.push({
        apps: []
      });
    }
  }

  /**
   * Inicializa os aplicativos disponíveis para o cluster
   * e seus contadores
   */
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
