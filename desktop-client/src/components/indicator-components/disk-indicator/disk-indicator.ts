import { Component, Input } from '@angular/core'
import { ServerDataDiskIo } from '../../../model/ServerData'

@Component({
    selector: 'disk-indicator',
    templateUrl: 'disk-indicator.html',
})
export class DiskIndicator {
    @Input() disk: ServerDataDiskIo
}