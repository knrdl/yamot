#!/usr/bin/env bash
echo Starting Yamot Controller on Port 8080 ...
id=$(sudo docker run --name yamot-prod --detach --publish 8080:8080/tcp yamot:prod)

if [ -z $id ]; then
	echo
	echo Error starting container, maybe it already exists
	echo To remove the old container run:
	echo sudo docker stop yamot-prod
	echo sudo docker rm yamot-prod
	exit 1
fi

echo
echo ===================================================================
sudo docker container ls
echo
sleep 2
echo
echo ===================================================================
sudo docker logs $id
echo
echo ===================================================================
echo
echo To stop the controller run:
echo sudo docker stop yamot-prod
echo
echo To start the controller again run:
echo sudo docker start yamot-prod
