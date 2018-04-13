import { Component, Input } from '@angular/core'
import { ServerDataTime } from '../../../model/ServerData'
import { DataService } from '../../../providers/data-service'

@Component({
    selector: 'time-indicator',
    templateUrl: 'time-indicator.html',
})
export class TimeIndicator {
    @Input() time: ServerDataTime
    @Input() powerSupply: number
    @Input() averageCurrent: number
    @Input() updateDiff: number

    constructor(private dataService: DataService, ) { }

}