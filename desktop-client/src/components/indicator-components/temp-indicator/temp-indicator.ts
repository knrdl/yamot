import { Component, Input } from '@angular/core'
import { ServerDataTemp } from '../../../model/ServerData'

@Component({
    selector: 'temp-indicator',
    templateUrl: 'temp-indicator.html',
})
export class TempIndicator {
    @Input() temp: ServerDataTemp[]

    private get avgTemp(): number {
        let sum = this.temp.reduce((total: number, dat: ServerDataTemp) => total + dat.cur, 0)
        return sum / this.temp.length
    }

}