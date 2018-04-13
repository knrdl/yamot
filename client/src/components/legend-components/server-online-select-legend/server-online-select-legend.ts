import { Component, EventEmitter, Output, OnInit } from '@angular/core'
import { DataService } from '../../../providers/data-service'

@Component({
    selector: 'server-online-select-legend',
    templateUrl: 'server-online-select-legend.html',
    styleUrls: ['./server-online-select-legend.scss'],
})
export class ServerOnlineSelectLegend implements OnInit {
    @Output() selected: EventEmitter<string> = new EventEmitter<string>(true)

    private currentServer: string

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        let svr: string[] = this.dataService.server.filter(svr => svr.online === 'online').map(svr => svr.alias)
        if (svr.length > 0)
            this.choice(svr[0])
    }

    private choice(svr: string): void {
        this.currentServer = svr
        this.selected.emit(svr)
    }
}