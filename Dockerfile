FROM node:16-alpine3.14

WORKDIR /

RUN apk update && apk add netcat-openbsd
RUN wget -q https://raw.githubusercontent.com/eficode/wait-for/v2.2.1/wait-for
RUN chmod +x ./wait-for


WORKDIR /usr/src/app

COPY package.json ./


RUN npm install --only=prod
RUN npm install sequelize-cli

COPY . .

CMD [ "npm", "start" ]