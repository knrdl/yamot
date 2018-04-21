import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { RestService } from './rest-service'
import { Server, ServerPower } from '../model/Server'
import { ServerData } from '../model/ServerData'
import { DataService } from './data-service'
import { Credentials } from '../model/Credentials'
import { Subscription } from 'rxjs'
import { ControllerConfig, ControllerServer } from '../model/Controller'

const server_attrs: string[] = ['alias', 'addr', 'user', 'pw', 'description', 'port', 'powerSupply', 'averageCurrent']

@Injectable()
export class ServerService {

    constructor(private restService: RestService, private dataService: DataService) { }

    updateList(server: Server[]): Observable<void> {
        return Observable.create(observer => {

            delete this.dataService.server
            this.dataService.server = server.map(svr => Object.assign(new Server(), svr))

            let conf: ControllerConfig = this.dataService.config
            delete this.dataService.config.server
            this.dataService.config.server = server.map(svr => {
                let tmp: ControllerServer = new ControllerServer()
                server_attrs.forEach((attr: string) => tmp[attr] = svr[attr])
                return tmp
            })
            this.dataService.saveConfig()

            observer.next()
            observer.complete()

        })
    }

    getData(server: Server): Observable<ServerData> {
        return this.restService.get(server, ServerData)
    }

    updateDescription(server: Server): Observable<void> {
        return Observable.create(observer => {
            let svr: ControllerServer = this.dataService.config.server.find(svr => svr.alias === server.alias)
            if (svr) {
                svr.description = server.description
                this.dataService.saveConfig()
            }
            observer.next()
            observer.complete()
        })
    }

    updatePowerData(server: Server, power: ServerPower): Observable<void> {
        return Observable.create(observer => {

            server.powerSupply = power.powerSupply
            server.averageCurrent = power.averageCurrent

            let svr: ControllerServer = this.dataService.config.server.find(svr => svr.alias === server.alias)
            if (svr) {
                svr.averageCurrent = power.averageCurrent
                svr.powerSupply = power.powerSupply
                this.dataService.saveConfig()
            }

            observer.next()
            observer.complete()

        })
    }

    private timer: Subscription
    private generalUpdateDiff: number = 0
    private hooks: Function[] = []

    startServerMeasurements(): void {
        this.timer = Observable.timer(0, 1000).subscribe(() => {
            this.dataService.server.forEach((server: Server) => {
                if (server.online === 'online') {
                    if (server.data && server.data.time) { //increase displayed times for better ux
                        server.data.time.up++
                        server.data.time.now++
                    }
                    server.updateDiff++
                }
            })

            if (this.generalUpdateDiff + 1 >= this.dataService.settings.updateInterval) {
                this.generalUpdateDiff = 0
                if (this.dataService.updating) {
                    this.hooks.forEach(hook => Observable.create(observer => {
                        hook()
                        observer.complete()
                    }).subscribe())
                    this.dataService.server.forEach((server: Server) => {
                        this.getData(server).subscribe( //update server measurement data
                            (data: ServerData) => {
                                server.data = data
                                server.online = 'online'
                                server.updateDiff = 0
                            },
                            () => {
                                server.online = 'offline'
                            }
                        )
                    })
                }
            } else {
                this.generalUpdateDiff++
            }
        })
    }

    hookServerMeasurements(fn: Function): void {
        this.hooks.push(fn)
    }

    unhookServerMeasurements(fn: Function): void {
        this.hooks = this.hooks.filter(func => func !== fn)
    }

    stopServerMeasurements(): void {
        this.timer.unsubscribe()
    }


}
