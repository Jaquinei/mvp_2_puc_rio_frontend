# Production Automation Tool Frontend

**Aluno: Jaquinei de Oliveira**

Este projeto faz parte do *MVP* do *Sprint 2* da Disciplina **Desenvolvimento Back-End Avançado**

O objetivo é apresentar o resultado prático obtido após o estudo do conteúdo apresentado ao longo das aulas da disciplinas apresentadas neste Sprint.

O MVP consiste em um Frontend, um Backend e acesso a acesso a uma API externa.

Este repositorio faz parte do MVP e contem o código para o Frontend.
Dentro os cenários apresentados no documento com as instruções sobre os requisitos para o MVP, esse trabalho está enquadrado no Cenário 1.1, uma vez que o acesso a API externa está sendo realizado pelo Backend.

O Frontend disponibilizado neste repositório contem o dockerFile possibilitando rodar containerizado. As instruções para fazer o build da imagem e rodar os container estão na seção [Como iniciar o Frontend usando o docker](#como-iniciar-o-frontend-usando-o-docker)

**Este conteúdo foca nos detalhes de uso do projeto do Frontend.**

## Fluxograma

Arquitetura implementada.

TODO: Adicionar fluxograma aqui

## Frontend (Interface)

O Frontend foi desenvolvido usando HTML, CSS e JavaScript e Bootstrap. Pode ser usado independentemente do Backend, mas para persistir os dados é necessário que o Backend esteja rodando.

Utiliza uma REST API para popular os dados e atualizar o banco de dados no Backend.

### Como iniciar o Frontend usando o docker:

- Certifique-se que o Docker esteja instalado
- Cria a imagem
- `docker build -t frontend_puc_rio_sprint_2_mvp .`
- Mapeia a porta local 8080 do host para a porta 80 do container
- `docker run -d -p 8080:80 frontend_puc_rio_sprint_2_mvp`
- Acesse a URL http://localhost:8080 no navegador

# Visão geral dos módulos do MVP

## Frontend (Interface)

O código do FrontEnd está disponível em outro repositório. Detalhes estão apresentados na secão [Frontend (Interface)](#frontend-interface)

## Backend (API)

O Backend foi feito usando Python: flask como servidor web e sqlite como banco de dados. O código do Backend está disponível em outro repositório.

Uma REST API é disponibilizada através do Backend para uso pelo Frontend. Detalhes sobre as rotas estão diponíveis no respositório backend.

## Acesso a uma API externa

O acesso a API externa está sendo feito utilizando a API da Notion (https://developers.notion.com/)
Para o backend acessar a API é necessário utilizar as seguintes informações:
- Notion API URL
- Token Notion
- Database ID

Estas informações (Notion API URL, Token e Database ID) serão disponibilizadas no texto de submissão deste MVP.

Foi criada um Notion page com uma lista de Tasks. Essas tasks podem ser incluidas no Prodution Automation Tool. Para acessar a lista do Notion, diretamente, o seguinte link pode ser usado (https://www.notion.so/1ce16f12775a80da8366cacacaa3d3da?v=1ce16f12775a807e846d000c874669ac&pvs=4).

# Development environment

## Como executar o Frontend

### Dev

Faça download do projeto
 - abra o arquivo *index.html* no seu browser (idealmente inicie o Backend usando as instruções do *README* disponível no repositório do backend)

### Docker

- Cria a imagem
- `docker build -t frontend_puc_rio_sprint_2_mvp .`
- Mapeia a porta local 8080 do host para a porta 80 do container
- `docker run -d -p 8080:80 frontend_puc_rio_sprint_2_mvp`
- Acesse a URL http://localhost:8080 no navegador
