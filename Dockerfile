# Use uma imagem base do Node.js
FROM node:18

# Crie o diretório de trabalho
WORKDIR /app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta da aplicação
EXPOSE 3000

# Comando padrão para iniciar a aplicação
CMD ["npm", "start"]