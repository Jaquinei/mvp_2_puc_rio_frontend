# Production Automation Tool Frontend

Este pequeno projeto faz parte do *MVP* do *Sprint 2* da Disciplina **Desenvolvimento Back-End Avançado**

**Aluno: Jaquinei de Oliveira**

O objetivo é apresentar o MVP consistindo em dois projetos e acesso a uma API externa:
- Frontend containerizado
- Backend containerizado
- Acesso de uma API externa
---

**Este conteúdo foca nos detalhes de uso do projeto do Frontend.**

---
## Frontend

O Frontend foi desenvolvido usando HTML, CSS e JavaScript e Bootstrap. Pode ser usado independentemente do Backend, mas para persistir os dados é necessário que o Backend esteja rodando.

Utiliza uma REST API para popular os dados e atualizar o banco de dados no Backend.

Como iniciar o Frontend usando o docker:

- Certifique-se que o Docker esteja instalado
- Cria a imagem
- `docker build -t frontend_puc_rio_sprint_2_mvp .`
- Mapeia a porta local 8080 do host para a porta 80 do container
- `sudo docker run -d 8080:80`
- Acesse a URL http://localhost:8080 no navegador


## Backend

O Backend foi feito usando Python: flask como servidor web e sqlite como banco de dados. O código do Backend está disponível em outro repositório.

Uma REST API é disponibilizada pelo Backend para uso pelo Frontend.

Desenvolvimento Back-End Avançado

## Acesso a uma API externa

O acesso a API externa é ....

---
## Como executar o Frontend

Faça download do projeto
 - abra o arquivo *index.html* no seu browser (idealmente inicie o Backend usando as instruções do *README* disponível no repositório do backend)
