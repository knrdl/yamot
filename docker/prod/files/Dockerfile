FROM node:carbon-alpine

RUN mkdir -p /yamot/controller

WORKDIR /yamot/controller

COPY controller.js ./
COPY package.json ./
COPY static ./static

RUN npm i

EXPOSE 8080

CMD npm run start
