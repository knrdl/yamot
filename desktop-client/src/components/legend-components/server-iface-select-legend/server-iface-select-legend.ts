import { Component, Input, EventEmitter, Output } from '@angular/core'
import { DataService } from '../../../providers/data-service'
import { Server } from '../../../model/Server'

@Component({
    selector: 'server-iface-select-legend',
    templateUrl: 'server-iface-select-legend.html',
    styleUrls: ['./server-iface-select-legend.scss'],
})
export class ServerIfaceSelectLegend {
    @Input() set server(s: string) {
        let svr: Server = this.dataService.server.find(svr => (svr.alias === s && svr.data && svr.data.net && svr.data.net.io && Object.keys(svr.data.net.io).length > 0))
        if (svr)
            this.ifaces = Object.keys(svr.data.net.io).sort((a, b) => {
                if (a < b) return -1
                if (a > b) return 1
                return 0
            })
        else{
            this.ifaces = []
            this.choice(undefined)
        }
            
        if (this.ifaces.length > 0)
            this.choice(this.ifaces[0])
    }
    @Output() selected: EventEmitter<string> = new EventEmitter<string>(true)

    private currentIface: string

    private ifaces: string[] = []

    constructor(private dataService: DataService) { }

    private choice(iface: string): void {
        this.currentIface = iface
        this.selected.emit(iface)
    }
}