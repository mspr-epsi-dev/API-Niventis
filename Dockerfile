FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 3000

# ##script to wait for mongo to be ready before starting the node app
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
# RUN chmod +x /wait

CMD NODE_ENV=production npm run server