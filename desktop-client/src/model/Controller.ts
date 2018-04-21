import { Settings } from "./Settings"
import { ServerPower } from "./Server";

export class ControllerServer extends ServerPower {
  alias: string
  addr: string
  port: number
  user: string
  pw: string

  description: string = ''
}

export class ControllerConfig {
  server: ControllerServer[] = []
  settings: Settings = new Settings()
}