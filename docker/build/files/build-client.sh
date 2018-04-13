#!/usr/bin/env bash

cd /yamot/client

#Bugfix for calling ng bin
export PATH=$PATH:/yamot/client/node_modules/@angular/cli/bin/

#Bugfix for aot compiler permissions problem
for file in $(find src/{app,components,directives,pages,pipes,providers}/ -type f -name "*.ts"); do
	echo "$file"
	sed -e 's/private /public /g' -e 's/protected /public /g' -i "$file"
done

NODE_ENV=production ng build --prod --aot --build-optimizer
