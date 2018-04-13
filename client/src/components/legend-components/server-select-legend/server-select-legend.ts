import { Component, Input, EventEmitter, Output } from '@angular/core'
import { DataService } from '../../../providers/data-service'
import { Server } from '../../../model/Server'

@Component({
    selector: 'server-select-legend',
    templateUrl: 'server-select-legend.html',
    styleUrls: ['./server-select-legend.scss'],
})
export class ServerSelectLegend {
    @Input() server: string[]
    @Input() action: 'add' | 'remove'
    @Output() click: EventEmitter<string> = new EventEmitter<string>(true)

    constructor(private dataService: DataService) { }

    private do(svr: string): void {
        this.click.emit(svr)
    }

    private onlineStatusClasses(alias: string): object {
        let svr: Server = this.dataService.server.find(svr => svr.alias === alias)
        if (svr)
            return { 'text-success': svr.online === 'online', 'text-danger': svr.online === 'offline', 'text-secondary': svr.online === 'unknown' }
    }


}