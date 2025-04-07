# usando o servidor web Nginx
FROM nginx:latest

# copiando os arquivos do frontrend para o diretorio padrão do servidor Nginx
COPY ./src /usr/share/nginx/html

# expondo a porta 80 (porta padrão do Nginx)
EXPOSE 80

# iniciando o Nginx
CMD ["nginx", "-g", "daemon off;"]