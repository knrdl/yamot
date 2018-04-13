#!/usr/bin/env bash
echo
echo
echo CONTROLLER:
cd /yamot/controller
npm run start &

sleep 2

echo
echo
echo SERVER:
cd /yamot/server
python3 yamot_server.py &
python3 dummy_server.py &

sleep 2

echo
echo "Press ^C to exit"
sleep inf
