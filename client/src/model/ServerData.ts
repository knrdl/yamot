export type Ip = 4 | 6

export class ServerDataUsage {
  used: number
  total: number
}

export class ServerDataFullUsage extends ServerDataUsage {
  free: number
}



export class ServerDataApp {
  memp: number
  port: number
  start: number
  term: string
  user: string
}

export class ServerDataBat {
  perc: number
  plug: boolean
}

export class ServerDataCpuCores {
  phy: number
  log: number
}

export class ServerDataCpuFreq {
  cur: number
  max: number
  min: number
}

export class ServerDataCpuUsage {
  user: number
  sys: number
}

export class ServerDataCpu {
  cores: ServerDataCpuCores
  freq: ServerDataCpuFreq[]
  names: [string, number][]
  usage: ServerDataCpuUsage[]
}

export class ServerDataDiskIo {
  read_bytes: number
  read_count: number
  read_time: number
  write_bytes: number
  write_count: number
  write_time: number
}

export class ServerDataDiskStore {
  device: string
  fstype: string
  mountpoint: string
  opts: string
  usage: ServerDataUsage
}

export class ServerDataDisk {
  io: ServerDataDiskIo
  store: ServerDataDiskStore[]
}

export type ServerDataLoad = [number, number, number]

export class ServerDataMem {
  ram: ServerDataUsage
  swap: ServerDataUsage
}

export class ServerDataNetAddr {
  ip: Ip
  addr: string
  broadcast: string
  netmask: string
}

export type ServerDataNetAddrObj = { [iface: string]: ServerDataNetAddr[] }

export class ServerDataNetIoRxTx {
  rx: number
  tx: number
}

export class ServerDataNetIo {
  byte: ServerDataNetIoRxTx
  pkt: ServerDataNetIoRxTx

  constructor(){
    this.byte = new ServerDataNetIoRxTx()
    this.pkt = new ServerDataNetIoRxTx()
  }
}

export type ServerDataNetIoObj = { [iface: string]: ServerDataNetIo }

export class ServerDataNetService {
  addr: string
  app: string
  ip: Ip
  port: number
}

export type ServerDataNetWifiStrength = [string, number]

export class ServerDataNet {
  addr: ServerDataNetAddrObj
  io: ServerDataNetIoObj
  services: ServerDataNetService[]
  wifistrength: ServerDataNetWifiStrength[]
}

export class ServerDataSysUname {
  machine: string
  node: string
  processor: string
  release: string
  system: string
  version: string
}

export class ServerDataSys {
  dist: string
  libc: string
  python: string
  uname: ServerDataSysUname
}

export class ServerDataTemp {
  critical: number
  cur: number
  name: string
}

export class ServerDataTime {
  boot: number
  now: number
  up: number
}

export class ServerDataUser {
  name: string
  term: string
  host: string
  login: number
  app: string
}

export class ServerData {
  app: ServerDataApp
  bat: ServerDataBat
  cpu: ServerDataCpu
  disk: ServerDataDisk
  load: ServerDataLoad
  mem: ServerDataMem
  net: ServerDataNet
  sys: ServerDataSys
  temp: ServerDataTemp[]
  time: ServerDataTime
  user: ServerDataUser[]
}