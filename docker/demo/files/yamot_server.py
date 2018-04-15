#!/usr/bin/env python3
import platform, os, time, socket, re, http.server, base64, datetime

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

try:
	import psutil
except ImportError:
	import sys
	print('PS-Util is not installed!', file=sys.stderr)
	print('Please try one of the following:', file=sys.stderr)
	print('    sudo apt-get install python3-psutil', file=sys.stderr)
	print('    sudo pip3 install psutil', file=sys.stderr)
	print('    pip3 install --user psutil', file=sys.stderr)
	exit(1)


def getCpu():
	out = dict(usage=[], freq=[], names=[])
	try:
		for c in psutil.cpu_times_percent(interval=None, percpu=True):
			out['usage'].append(dict(user=c.user, sys=c.system))
	except:
		pass
	try:
		out['cores'] = dict(log=psutil.cpu_count(logical=True), phy=psutil.cpu_count(logical=False))
	except:
		pass
	try:
		for c in psutil.cpu_freq(percpu=True):
			out['freq'].append(dict(min=c.min, max=c.max, cur=round(c.current)))
	except:
		pass
	try:
		names = []
		with open('/proc/cpuinfo') as f:
			for line in f.read().splitlines():
				if line.startswith('model name'):
					names.append(line.split('model name	: ')[1])
		name_quant = {}
		for n in names:
			if n in name_quant:
				name_quant[n] += 1
			else:
				name_quant[n] = 1
		for kv in sorted(name_quant.items(), key=lambda x: x[0]):
			out['names'].append(kv)
		del names
		del name_quant
	except:
		pass
	return out


def getLoad():
	try:
		return os.getloadavg()
	except:
		pass


def getTime():
	out = dict()
	try:
		out['boot'] = int(psutil.boot_time())
	except:
		pass
	try:
		out['up'] = int(time.time() - psutil.boot_time())
	except:
		pass
	try:
		out['now'] = int(datetime.datetime.now().timestamp())
	except:
		pass
	return out


def getMem():
	out = dict()
	try:
		d = psutil.virtual_memory()
		out['ram'] = dict(total=d.total, used=d.used)
	except:
		pass
	try:
		d = psutil.swap_memory()
		out['swap'] = dict(total=d.total, used=d.used)
	except:
		pass
	return out


def getNet():
	def family_ip(fam):
		if fam == socket.AF_INET:
			return 4
		if fam == socket.AF_INET6:
			return 6

	addr = dict()
	try:
		for iface, addrs in psutil.net_if_addrs().items():
			addr[iface] = []
			for e in addrs:
				addr[iface].append(dict(
						ip=family_ip(e.family), addr=e.address,
						broadcast=e.broadcast, netmask=e.netmask
					))
	except:
		pass

	io = dict()
	try:
		for iface, val in psutil.net_io_counters(pernic=True, nowrap=True).items():
			io[iface] = dict(
					byte=dict(rx=val.bytes_recv, tx=val.bytes_sent),
					pkt=dict(rx=val.packets_recv, tx=val.packets_sent)
				)
	except:
		pass

	services = []
	try:
		for c in psutil.net_connections():
			if c.status == 'LISTEN':
				srvc = dict(ip=family_ip(c.family), addr=c.laddr.ip, port=c.laddr.port)
				if c.pid:
					try:
						srvc['app'] = psutil.Process(c.pid).name()
					except:
						pass
				services.append(srvc)
	except:
		pass
	services.sort(key=lambda x: '{addr}:{port}'.format(**x))

	wifistrength = []
	if os.path.isfile('/proc/net/wireless'):
		try:
			with open('/proc/net/wireless') as f:
				lines = f.read().splitlines()
				if len(lines) > 2:
					for line in lines[2:]:
						m = re.search('(\w+?):\s+\d+\s+(\d+)', line)
						if m:
							wifistrength.append([m.group(1), int(m.group(2))])
		except:
			pass

	return dict(addr=addr, io=io, services=services, wifistrength=wifistrength)


def getDisk():
	store = []
	try:
		for c in psutil.disk_partitions(all=True):
			p = c._asdict()
			if c.mountpoint:
				try:
					p['usage'] = psutil.disk_usage(c.mountpoint)._asdict()
					del p['usage']['percent']
				except:
					pass
			store.append(p)
		store.sort(key=lambda x: x.get('mountpoint'))
	except:
		pass

	try:
		io = psutil.disk_io_counters(nowrap=True)._asdict()
		if 'busy_time' in io:
			del io['busy_time']
		if 'read_merged_count' in io:
			del io['read_merged_count']
		if 'write_merged_count' in io:
			del io['write_merged_count']
	except:
		io = dict()
	return dict(store=store, io=io)


def getBat():
	try:
		d = psutil.sensors_battery()
		return dict(perc=d.percent, plug=d.power_plugged)
	except:
		pass


def getTemp():
	temp = []
	try:
		for name, temps in psutil.sensors_temperatures(fahrenheit=False).items():
			for t in temps:
				temp.append(dict(name=t.label if t.label else name, cur=t.current, critical=t.critical))
	except:
		pass
	try:
		for e in os.listdir('/sys/bus/w1/devices/'):
			if re.search('^[\w-]+$', e) and os.path.isfile('/sys/bus/w1/devices/' + e + '/w1_slave'):
				with open('/sys/bus/w1/devices/' + e + '/w1_slave') as f:
					lines = f.read().splitlines()
					if len(lines) > 1:
						if ' YES' in lines[0]:
							m = re.search('t=(-?\d+)', lines[1])
							if m:
								temp.append(dict(name='1 wire', cur=int(float(m.group(1)) / 1000), critical=None))
	except:
		pass
	return temp


def getUser():
	user = []
	try:
		for c in psutil.users():
			d = dict(name=c.name, term=c.terminal, host=c.host, login=int(c.started))
			try:
				p = psutil.Process(c.pid)
				d['app'] = p.name()
			except:
				pass
			user.append(d)
	except:
		pass
	return user


def getSys():
	out = dict()
	try:
		out['python'] = platform.python_version()
	except:
		pass
	try:
		out['uname'] = platform.uname()._asdict()
	except:
		pass
	try:
		out['libc'] = ' '.join(platform.libc_ver())
	except:
		pass
	try:
		if os.path.isfile('/etc/lsb-release'):
			with open('/etc/lsb-release') as f:
				m = re.search('DISTRIB_DESCRIPTION="(.+)"', f.read())
				if m:
					out['dist'] = m.group(1)
		elif os.path.isfile('/etc/os-release'):
			with open('/etc/os-release') as f:
				m = re.search('PRETTY_NAME="(.+)"', f.read())
				if m:
					out['dist'] = m.group(1)
	except:
		pass
	return out


def getApp():
	try:
		p = psutil.Process()
		return dict(start=int(p.create_time()), term=p.terminal(), user=p.username(), memp=round(p.memory_percent(), 2), port=settings.get('port'))
	except:
		pass


settings = None


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

			response = dict(data=dict(
					cpu=getCpu(), load=getLoad(), time=getTime(), mem=getMem(), net=getNet(), disk=getDisk(),
					bat=getBat(), temp=getTemp(), user=getUser(), sys=getSys(), app=getApp()
				))

			self.wfile.write(jsondump(response).encode('utf-8', 'surrogateescape'))
			del response

	def log_message(self, format, *args):
		return


if __name__ == '__main__':
	if os.path.isfile('yamot_server_settings.json'):
		with open('yamot_server_settings.json') as f:
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
				pool = string.ascii_letters+string.digits
				settings['password'] = ''.join([random.SystemRandom().choice(pool) for _ in range(8)])
			else:
				settings['password'] = inp

		with open('yamot_server_settings.json', 'w') as f:
			jsondumpf(settings, f)

	print('PORT:     ', settings.get('port'))
	print('USER:     ', settings.get('username'))
	print('PASSWORD: ', settings.get('password'))
	print()
	print('Server is running')
	http.server.HTTPServer(('', settings.get('port')), YamotServerHandler).serve_forever()
