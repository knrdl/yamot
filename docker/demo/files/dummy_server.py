#!/usr/bin/env python3

import os, http.server, base64, random, datetime

try:
	from ujson import dumps as jsondump
	from ujson import load as jsonloadf
	from ujson import dump as jsondumpf
except ImportError:
	print('Warning: ujson is not installed: falling back to slower standard-module')
	print('Try to install ujson (e.g. sudo apt-get install python3-ujson)')
	from json import dumps as jsondump
	from json import load as jsonloadf
	from json import dump as jsondumpf


settings = None

rx_b = tx_b = rx_p = tx_p = 0

def getDummyData():
	global rx_b, tx_b, rx_p, tx_p
	rx_b+=random.choice(range(1,10000000))
	tx_b+=random.choice(range(1,1000000))
	rx_p+=random.choice(range(1,100))
	tx_p+=random.choice(range(1,100))

	used_1 = random.choice(range(467273064448))
	free_1 = 0.9 * (467273064448 - used_1)

	used_2 = random.choice(range(7*467273064448))
	free_2 = 0.99 * (7*467273064448 - used_2)

	return {
		"user": [
			{"host": "localhost", "login": 1522872320, "name": "user", "app": "upstart", "term": "tty7"}
		],
		"temp": [
			{"name": "Core 0", "critical": 90.0, "cur": 30+random.choice(range(61))},
			{"name": "Core 1", "critical": 90.0, "cur": 30+random.choice(range(61))},
			{"name": "Core 2", "critical": 90.0, "cur": 30+random.choice(range(61))},
			{"name": "Core 3", "critical": 90.0, "cur": 30+random.choice(range(61))},
		],
		"cpu": {
			"names": [["Intel(R) Pentium(R) CPU  N3700  @ 1.60GHz", 4]],
			"cores": {"log": 4, "phy": random.choice([1,2,4])},
			"usage": [
				{"user": random.choice(range(51)), "sys": random.choice(range(51))},
				{"user": random.choice(range(51)), "sys": random.choice(range(51))},
				{"user": random.choice(range(51)), "sys": random.choice(range(51))},
				{"user": random.choice(range(51)), "sys": random.choice(range(51))}
			],
			"freq": [
				{"max": 2400.0, "cur": random.choice(range(2401)), "min": 480.0},
				{"max": 2400.0, "cur": random.choice(range(2401)), "min": 480.0},
				{"max": 2400.0, "cur": random.choice(range(2401)), "min": 480.0},
				{"max": 2400.0, "cur": random.choice(range(2401)), "min": 480.0}
			]
		},
		"time": {
			"now": int(datetime.datetime.now().timestamp()), "boot": 1523519399, "up": int(datetime.datetime.now().timestamp()) - 1523519399
		 },
		"app": {
			"term": "/dev/pts/1", "memp": round(random.random(), 2), "port": 9393, "start": 1522872374, "user": "user"
		},
		"load": [round(random.random()*4, 2) for c in range(3)],
		"net": {
			"addr": {
				"wlan0": [
					{"broadcast": "192.168.1.255", "addr": "192.168.1.5", "netmask": "255.255.255.0", "ip": 4},
					{
						"broadcast": None, "addr": "1234:1234:1234:1234:1234:1234:1234:1234",
						"netmask"  : "ffff:ffff:ffff:ffff::", "ip": 6
					}
				],
				"lo": [
					{"broadcast": None, "addr": "127.0.0.1", "netmask": "255.0.0.0", "ip": 4}
				]
			}, "services": [
				{"addr": "0.0.0.0", "port": 9393, "ip": 4, "app": "python3"},
				{"addr": "127.0.1.1", "port": 53, "ip": 4},
				{"addr": "::", "port": 8080, "ip": 6, "app": "node"}
			],
			"wifistrength": [
				["wlan0", 30+random.choice(range(70))]
			],
			"io": {
				"wlan0": {"byte": {"tx": tx_b, "rx": rx_b}, "pkt": {"tx": tx_p, "rx": rx_p}},
				"lo": {"byte": {"tx": 377210271, "rx": 377210271}, "pkt": {"tx": 105457, "rx": 105457}}
			}
		}, "disk": {
			"store": [
				{
					"device": "/dev/sda1",
					 "usage": {
						"total": 467273064448, "used": used_1, "free": free_1
					},
					 "mountpoint": "/",
					 "opts": "rw,relatime,errors=remount-ro,data=ordered",
					 "fstype": "ext4"
				}, {
					"device": "/dev/sda2",
					"usage": {
						"total": 495560704, "used": 123340800, "free": 346635264
					},
					"mountpoint": "/boot",
					"opts": "rw,relatime,block_validity,barrier,user_xattr,acl",
				    "fstype": "ext2"
			    }, {
					"device": "/dev/mapper/root",
					"usage": {
						"total": 7*467273064448, "used": used_2, "free": free_2
					},
					"mountpoint": "/media/data/stuff",
					"opts": "rw,relatime,data=ordered",
					"fstype": random.choice(['fat32', 'ext3', 'ext4', 'ntfs', 'refs', 'reiserfs', 'btrfs', 'ext2'])
			    }
			],
			"io": {
				"read_bytes" : random.choice(range(32958365696)), "read_time": random.choice(range(1423008)),
				"write_count": random.choice(range(3275435)), "write_time": random.choice(range(11897488)),
				"write_bytes": random.choice(range(20189396992)), "read_count": random.choice(range(2681124))
			}
		},
		"mem": {
			"swap": {"total": 4139773952, "used": random.choice(range(4139773952+1))},
			"ram": {"total": 3989643264, "used": random.choice(range(3989643264+1))}
		},
		"bat": {
			"plug": random.choice([True, False]), "perc": random.choice([*range(101), 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100])
		},
		"sys": {
			"libc": "glibc 2.9",
			"uname": {
				"version": "#46~16.04.1-Ubuntu SMP Mon Dec 4 15:57:59 UTC 2017", "machine": "x86_64",
				"release": "4.%s.0-42-generic" % random.choice(range(15)), "system": "Linux", "processor": "x86_64", "node": "hostname"
			},
			"python": "3.5.2",
			"dist": "Ubuntu {}.{}.{}{}".format(random.choice(range(12,18)), random.choice(['04', '10']), random.choice(range(1,5)), random.choice([' LTS', '']))
		}
	}


class YamotServerHandler(http.server.BaseHTTPRequestHandler):

	def __init__(self, *args, **kwargs):
		self.basicAuthHeader = 'Basic ' + str(
			base64.b64encode(bytes(':'.join([settings.get('username'), settings.get('password')]), 'utf-8')).decode(
				'ascii'))
		super(YamotServerHandler, self).__init__(*args, **kwargs)

	def cors_headers(self):
		self.send_header('Access-Control-Allow-Origin', '*')
		self.send_header('Access-Control-Allow-Methods', 'GET')
		self.send_header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

	def do_OPTIONS(self):
		self.send_response(200)
		self.cors_headers()
		self.end_headers()

	def do_GET(self):
		if self.headers.get('Authorization') is None or self.headers.get('Authorization') != self.basicAuthHeader:
			self.send_response(401)
			self.send_header('WWW-Authenticate', 'Basic realm="Yamot Login"')
			self.send_header('Content-type', 'text/plain')
			self.end_headers()
			self.wfile.write(bytes('', 'utf-8'))

		else:
			self.send_response(200)
			self.send_header('Content-type', 'application/json')
			self.cors_headers()
			self.end_headers()

			response = dict(data=getDummyData())

			self.wfile.write(jsondump(response).encode('utf-8', 'surrogateescape'))
			del response

	def log_message(self, format, *args):
		return


if __name__ == '__main__':
	if os.path.isfile('dummy_server_settings.json'):
		with open('dummy_server_settings.json') as f:
			settings = jsonloadf(f)
	else:
		settings = {}

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
				pool = string.ascii_letters+string.punctuation+string.digits
				settings['password'] = ''.join([random.SystemRandom().choice(pool) for _ in range(20)])
			else:
				settings['password'] = inp

		with open('dummy_server_settings.json', 'w') as f:
			jsondumpf(settings, f)

	print('PORT:     ', settings.get('port'))
	print('USER:     ', settings.get('username'))
	print('PASSWORD: ', settings.get('password'))
	print()
	print('Server is running')
	http.server.HTTPServer(('', settings.get('port')), YamotServerHandler).serve_forever()
