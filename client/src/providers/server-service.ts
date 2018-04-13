import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { RestService } from './rest-service'
import { Server, ServerPower } from '../model/Server'
import { ServerData } from '../model/ServerData'
import { DataService } from './data-service'
import { Credentials } from '../model/Credentials'
import { Subscription } from 'rxjs'

@Injectable()
export class ServerService {

    constructor(private restService: RestService, private dataService: DataService) { }

    updateList(server: Server[]): Observable<void> {
        return Observable.create(observer => {
            this.restService.call('server/', { method: 'put', body: server, type: Server }).subscribe((server: Server[]) => {
                delete this.dataService.server
                this.dataService.server = server
                observer.next()
                observer.complete()
            }, (error) => {
                observer.error(error)
                observer.complete()
            })
        })
    }

    getData(server: Server): Observable<ServerData> {
        return this.restService.call(`http://${server.addr}:${server.port}/`, { type: ServerData, destination: 'external', auth: new Credentials(server.user, server.pw) })
    }

    updateDescription(server: Server): Observable<void> {
        return this.restService.call(`server/${server.alias}/description`, { method: 'put', body: { description: server.description } })
    }

    updatePowerData(server: Server, power: ServerPower): Observable<void> {
        return Observable.create(observer => {
            this.restService.call(`server/${server.alias}/power`, {
                method: 'put', body: {
                    volts: power.powerSupply,
                    ampere: power.averageCurrent
                }
            }).subscribe(() => {
                server.powerSupply = power.powerSupply
                server.averageCurrent = power.averageCurrent
                observer.next()
                observer.complete()
            }, (error) => {
                observer.error(error)
                observer.complete()
            })
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
