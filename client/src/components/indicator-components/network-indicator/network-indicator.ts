import { Component, Input } from '@angular/core'
import { ServerDataNetAddrObj, ServerDataNetIoObj, ServerDataNetIo } from '../../../model/ServerData'
import { NetService } from '../../../providers/net-service'

@Component({
    selector: 'network-indicator',
    templateUrl: 'network-indicator.html',
})
export class NetworkIndicator {
    @Input() addr: ServerDataNetAddrObj = {}
    @Input() io: ServerDataNetIoObj = {}

    private showDialog: boolean = false

    private lastUpdateDiff: number = 1

    private ioCurrent: ServerDataNetIoObj = {}

    private ioDiff: ServerDataNetIoObj = {}

    constructor(private netService: NetService){}

    @Input() set updateDiff(diff: number) {
        if (diff == 0) {
            this.lastUpdateDiff++ //fixme: better precision
            this.ifaces.forEach((iface: string) => {
                if (this.ioCurrent[iface]) {
                    this.ioDiff[iface].byte.rx = (this.io[iface].byte.rx - this.ioCurrent[iface].byte.rx) / this.lastUpdateDiff
                    this.ioDiff[iface].byte.tx = (this.io[iface].byte.tx - this.ioCurrent[iface].byte.tx) / this.lastUpdateDiff
                    this.ioDiff[iface].pkt.rx = this.io[iface].pkt.rx - this.ioCurrent[iface].pkt.rx
                    this.ioDiff[iface].pkt.tx = this.io[iface].pkt.tx - this.ioCurrent[iface].pkt.tx
                } else if (Object.keys(this.io).length > 0) {
                    this.ioDiff[iface] = new ServerDataNetIo()
                }
            })
            if (Object.keys(this.io).length > 0)
                this.ioCurrent = this.io
        } else {
            this.lastUpdateDiff = diff
        }
    }

    private get ifaces(): string[] {
        let ifaces: string[] = Object.keys(this.addr)
        ifaces.sort((a, b) => {
            if (a < b) return -1
            if (a > b) return 1
            return 0
        })
        return ifaces
    }

}