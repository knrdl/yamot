#!/usr/bin/env bash
if [ $(sudo docker images yamot:demo | wc -l) -lt 2 ]; then
	sudo docker build -t yamot:demo files
fi
sudo docker run -it --rm --name yamot-demo -p 8080:8080/tcp -p 9393:9393/tcp -p 9494:9494/tcp yamot:demo
