FROM node:18-alpine # Uma imagem Node.js mais leve

WORKDIR /app

COPY . /app

# Instala o http-server globalmente dentro do container
RUN npm install -g http-server

# Expõe a porta 80 para indicar que o servidor web estará rodando nela
EXPOSE 80

# Define o comando para iniciar o servidor web quando o container for iniciado
CMD ["http-server", "-p", "80"]
