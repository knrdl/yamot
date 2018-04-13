#!/usr/bin/env bash

sudo rm -rf dist/*
mkdir -p files/tmp

cp -r ../../client files/tmp
cp -r ../../controller files/tmp

sudo docker build -t yamot:build files
sudo docker run -it --name yamot-build yamot:build

sudo docker cp yamot-build:/yamot/client/dist dist/
sudo mv dist/dist dist/static
sudo docker cp yamot-build:/yamot/controller/dist/bundle.js dist
sudo mv dist/bundle.js dist/controller.js

sudo docker rm yamot-build
#~ sudo docker rmi yamot:build
#~ sudo docker image prune
rm -rf files/tmp
