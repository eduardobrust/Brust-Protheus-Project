# Brust-Protheus-Project
Repository for developing TL++ and POUI projects for the Totvs Protheus environment.

# projectsPOUI
Projetos desenvolvidos em POUI para uso no Protheus.

Versões globais inicio do projeto

Angular CLI: 16.2.8
Node: 18.18.0
Package Manager: npm 9.8.1
OS: win32 x64

Angular:
...

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.1602.8 (cli-only)
@angular-devkit/core         16.2.8 (cli-only)
@angular-devkit/schematics   16.2.8 (cli-only)
@schematics/angular          16.2.8 (cli-only)

Estrutura sugerida para o projeto :

app
|-- componentes
|   |-- componente1
|   |   |-- componente1.component.ts
|   |   |-- componente1.component.html
|   |   |-- componente1.component.css
|   |   |-- componente1.service.ts (Serviço relacionado ao Componente 1)
|   |-- componente2
|   |   |-- componente2.component.ts
|   |   |-- componente2.component.html
|   |   |-- componente2.component.css
|   |   |-- componente2.service.ts (Serviço relacionado ao Componente 2)
|-- shared
|   |-- services
|   |   |-- api.service.ts (Serviço genérico para chamadas HTTP)
|-- app.module.ts


[Instalando o PO UI]

https://po-ui.io/guides/getting-started

0. Verificar versão do angular atual compativel com o POUI
para atualiazar o angular : npm update

1. passos para instalação do PO UI
ng new po-proj-routine-company --skip-install

1.1. verificar as dependencias do angular no arquivo package.json [rxjs sempre dá problema]

npm version @angular/rxjs 
npm install rxjs@~7.5.5 --save
npm list rxjs

1.2. executar o comando na pasta raiz do projeto
npm install

2. Adiconando o pacote @po-ui/ng-components
ng add @po-ui/ng-components

* tive que voltar a versão do meu   "rxjs": "~7.8.0" para "rxjs": "~7.5.5"

3. Rode o seu projeto
ng serve

4. Instalando po-page-login, po-modal-password-recovery, po-page-blocked-user, po-page-dynamic-table 
ng add @po-ui/ng-templates

5. Gerar a build do projeto - Será criada uma pasta chamada dist na raiz do projeto "build de produção" ou "build de release".
ng build --configuration=production

[ATUALIZANDO O ANGULAR GLOBALMENTE]
1. ir para a pasta raiz do projeto e rodar o comando
npm update -g @angular/cli


[ATUALIZANDO O PO UI]

entrar na raiz do projeto
rodar comando abaixo:
ng update @po-ui/ng-components@15.9.2 --allow-dirty --force
ng update @po-ui/ng-templates@15.9.2 --allow-dirty --force


passos para publicar no protheus

Criar a aplicação web
Gerar a build de produção da aplicação web
Compactar a pasta que a build gerou e renomear para que a extensão fique como .app
Compilar o arquivo compactado .app no RPO, basta compilá-lo normalmente, ele será compilado como resource e ficará no RPO.
Criar um fonte com uma função, que será a rotina de menu
Nesse fonte, você utilizará a função FWCallApp para chamar a aplicação gerada, sendo que o parâmetro principal da FWCallApp é exatamente o nome do arquivo .app que você compilou como resource no RPO (my-po-project)

6. para Gerar atualização da rotina no protheus.
    excluir rotina do rpo my-po-project
    apagar a pasta dist do projeto angular PO UI.
    fazer as alterações no projeto e gerar novo build
    zipar a pasta gerada na pasta dist 
    mudar a extensão de zip para app
    copiar o arquivo  my-po-project.app para a pasta do protheus onde existe a function tlpp que chamará o app.
    compilar no rpo do protheus os 2 arquivos.
    apagar a pasta(my-po-project) em \Protheus_Data\http-root\app-root
    chamar rotina pelo protheus para gerar a pasta novamente
    
7. para criar um novo componente
    entrar na pasta raiz do projeto : my-po-project
    rodar o comando :
    ng g c nome-componente
    ir no arquivo app.module.ts e importar o componente se necessário de acordo com a documentação do PO UI
    pegar no arquivo .ts do componente o conteudo da propriedade do selector para poder instanciar no html que será mostrado.
    colocar na chamada do componente a class css padrao

8. criar um serviço 
    navegar ate a pasta app
    ng generate service services/sample-po-service ou ng g s services/sample-po-service