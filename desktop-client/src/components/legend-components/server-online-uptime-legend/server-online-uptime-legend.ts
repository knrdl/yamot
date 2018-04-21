import { Component } from '@angular/core'
import { DataService } from '../../../providers/data-service'

@Component({
    selector: 'server-online-uptime-legend',
    templateUrl: 'server-online-uptime-legend.html',
    styleUrls: ['./server-online-uptime-legend.scss'],
})
export class ServerOnlineUptimeLegend {
    constructor(private dataService: DataService) { }
}