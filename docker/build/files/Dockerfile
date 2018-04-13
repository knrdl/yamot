FROM node:carbon-stretch

RUN mkdir -p /yamot/client
RUN mkdir -p /yamot/controller

WORKDIR /yamot
COPY tmp/client ./client/
COPY tmp/controller ./controller/
COPY build-client.sh .
COPY build-controller.sh .

WORKDIR /yamot/client
RUN npm i

WORKDIR /yamot/controller
RUN npm i

WORKDIR /yamot
CMD bash build-client.sh && bash build-controller.sh
