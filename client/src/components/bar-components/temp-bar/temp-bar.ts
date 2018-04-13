import { Component, Input } from '@angular/core'
import { ServerDataTemp } from '../../../model/ServerData'

@Component({
    selector: 'temp-bar',
    templateUrl: 'temp-bar.html',
    styleUrls: ['../generic-bar/generic-bar.scss']
})
export class TempBar {
    @Input() temp: ServerDataTemp

    get proportion(): number {
        return Math.max(Math.min(this.temp.cur / (this.temp.critical || 100), 1), 0)
    }

    get text():string {
        return `${this.temp.cur} °C ${this.temp.name ? 'on' : ''} ${this.temp.name}`
    }

}