FROM node:carbon-stretch

RUN mkdir -p /yamot/controller
RUN mkdir -p /yamot/server

WORKDIR /yamot
COPY controller.js ./controller
COPY package.json ./controller
COPY yamot_config.json ./controller
COPY static ./controller/static
COPY dummy_server* ./server/
COPY yamot_server* ./server/
COPY start.sh .

WORKDIR /yamot/controller
RUN npm i
RUN apt-get -y update
RUN apt-get -y install python3-ujson python3-psutil

EXPOSE 8080
EXPOSE 9393
EXPOSE 9494

WORKDIR /yamot
CMD bash start.sh
