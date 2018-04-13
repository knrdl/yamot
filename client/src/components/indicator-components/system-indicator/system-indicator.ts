import { Component, Input } from '@angular/core'
import { ServerDataSys } from '../../../model/ServerData'

@Component({
    selector: 'system-indicator',
    templateUrl: 'system-indicator.html',
})
export class SystemIndicator {
    @Input() sys: ServerDataSys

}