import { Component, Input } from '@angular/core'
import { ServerDataCpu } from '../../../model/ServerData'

@Component({
    selector: 'cpu-indicator',
    templateUrl: 'cpu-indicator.html',
})
export class CpuIndicator {
    @Input() cpu: ServerDataCpu
    @Input() arch: string
}