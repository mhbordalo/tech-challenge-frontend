# Use a imagem base oficial do Node.js
FROM node:16-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Construa a aplicação para produção
RUN npm run build

# Exponha a porta que o servidor HTTP estático usará
EXPOSE 5000

# Comando para iniciar o servidor HTTP estático e servir o build da aplicação
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "5000"]