# Test Dev Front-end

Esse arquivo README tem oobjetivo de explicar como executar e visualizar o desenvolvimento do teste da TagPlus. Além de apresentar os recursos e as bibliotecas externas utilizadas no mesmo.

No arquivo `service.ts`, onde foi feita toda a funcionalidade do teste, cada método está comentado para resumir como a lógica foi desenvolvida.

## Tecnologias

Para o desenvolvimento, foi utilizado o framework [Angular CLI](https://github.com/angular/angular-cli), utilizando HTML, SCSS e Typescript.

## Rodar o projeto

Para rodar o projeto é necessário ir para o diretório raiz do projeto `cd server-clusters`, instalar as dependencias (no caso deste projeto foi utilizado o npm do nodejs) `npm install`, rodar o projeto com o comando `ng serve` e assim que o projeto estiver compilado, utilizar o navegador em [localhost](http://localhost:4200) na porta 4200 (`http://localhost:4200`). 

```sh
$ cd server-clusters
$ npm install
$ ng serve
```

## Bibliotecas

### Estilização

Duas bibliotecas de estilização foram utilizadas neste projeto: `bootstrap` e `font-awesome`. `Bootstrap` foi utilizado para estilizar e ajudar no design de acordo com o [mock](https://raw.githubusercontent.com/TagPlus/teste-dev-frontend/master/mockup.png) disponibilizado. Foi uma forma de deixar o teste mais fidedigno possível, sem perder muito tempo. Então a maioria das classes CSS utilizadas foram com `bootstrap`.

`Font-awesome` é uma biblioteca de ícones, que podem ser utilizadas como classes CSS. Assim utilizei o mesmo para poder estilizar os ícones de adicionar/remover servidor e adicionar/remover um app. 

### Pipe

Foi utilizado um `pipe` para transformar a data de inicialização de um aplicativo para o tempo que foi inicializado. O `time-ago-pipe` foi instalado utilizando `npm install time-ago-pipe --save`, e foi utilizado no component `home` para transformar o atributo `createdAt` do objeto `app` para `a second ago`, `a minute ago`, e etc.