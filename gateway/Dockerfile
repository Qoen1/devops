ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY . .

RUN npm install

CMD npm start
