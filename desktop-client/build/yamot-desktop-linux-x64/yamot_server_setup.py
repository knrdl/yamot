#!/usr/bin/env python3
import platform, os, time, socket, re, http.server, base64, datetime

try:
	from ujson import dump as jsondumpf
except ImportError:
	print('Warning: ujson is not installed: falling back to slower standard-module')
	print('Try to install ujson (e.g. sudo apt-get install python3-ujson)')
	from json import dump as jsondumpf

settings = {}

if __name__ == '__main__':
	if not settings.get('port') or not settings.get('username') or not settings.get('password'):
		while not settings.get('port'):
			inp = input('Port [9393]: ')
			if inp == '':
				settings['port'] = 9393
			elif inp.isdigit() and int(inp) > 1024:
				settings['port'] = int(inp)
			else:
				print('Please enter a port number (>1024)')

		if not settings.get('username'):
			inp = input('Username [yamot]: ')
			if inp == '':
				settings['username'] = 'yamot'
			else:
				settings['username'] = inp

		if not settings.get('password'):
			inp = input('Password [random]: ')
			if inp == '':
				import random, string
				pool = string.ascii_letters+string.digits
				settings['password'] = ''.join([random.SystemRandom().choice(pool) for _ in range(8)])
			else:
				settings['password'] = inp

		with open('yamot_server_settings.json', 'w') as f:
			jsondumpf(settings, f)
