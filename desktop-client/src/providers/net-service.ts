import { Injectable } from '@angular/core'

const portLut = {
    21: 'ftp',
    22: 'ssh',
    23: 'telnet',
    25: 'smtp',
    53: 'dns',
    67: 'bootp',
    70: 'gopher',
    80: 'http',
    123: 'ntp',
    139: 'samba',
    143: 'imap',
    194: 'irc',
    220: 'imap',
    443: 'https',
    445: 'samba',
    631: 'cups',
    636: 'ldap',
    873: 'rsync',
    1234: 'vlc',
    1433: 'db',
    1521: 'db',
    1526: 'db',
    2483: 'db',
    3128: 'squid',
    3306: 'db',
    4567: 'sinatra',
    4713: 'pulseaudio',
    5037: 'adb',
    5432: 'db',
    5984: 'db',
    6600: 'mpd',
    8080: 'http',
    8118: 'privoxy',
    9050: 'tor',
    9051: 'tor',
    9981: 'tvheadend',
    9982: 'tvheadend',
    19000: 'jack'
}

@Injectable()
export class NetService {

    lookupPort(port: number): string {
        return portLut[port] || ''
    }

    formatAddr(ip: 4 | 6, addr: string, includeProto: boolean = false): string {
        return `${includeProto ? 'http://' : ''}${ip == 6 ? '[' : ''}${addr}${ip == 6 ? ']' : ''}`
    }

    formatDevUrl(hostname: string, port: number): string {
        return `http://${hostname}:${port}/`
    }

    isLocalIp(ip: 4 | 6, addr: string): boolean {
        return (ip == 4 && (addr === '127.0.0.1' || addr === '127.0.1.1')) || (ip == 6 && addr === '::1')
    }

}
