FROM node:9.4.0-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install 

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
