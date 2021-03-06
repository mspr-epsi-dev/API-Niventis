FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 3001

CMD NODE_ENV=production npm run server