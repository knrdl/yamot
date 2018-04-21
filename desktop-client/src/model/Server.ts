import { ServerData } from "./ServerData"

export class ServerPower {

  powerSupply: number = 0 //Volts

  averageCurrent: number = 0 //Ampere
  
}

export class Server extends ServerPower {

  alias: string

  addr: string

  port: number

  user: string

  pw: string

  description: string = ''

  data?: ServerData

  online: 'online' | 'offline' | 'unknown' = 'unknown'

  updateDiff: number = 0

}