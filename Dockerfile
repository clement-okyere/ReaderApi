FROM node:16-alpine3.11

LABEL "author"="Clement Okyere"

WORKDIR /home/node/app

ARG DB_NAME
ENV DB_NAME="${DB_NAME}"

ARG DB_USER
ENV DB_USER="${DB_USER}"

ARG DB_HOST
ENV DB_HOST="${DB_HOST}"

ARG DB_PASSWORD
ENV DB_PASSWORD="${DB_PASSWORD}"

ARG DB_PORT
ENV DB_PORT="${DB_PORT}"

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

USER node

CMD node dist/index.js