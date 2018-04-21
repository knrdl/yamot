import { Component, Input } from '@angular/core'
import { ServerDataFullUsage } from '../../../model/ServerData'

@Component({
    selector: 'storage-bar',
    templateUrl: 'storage-bar.html',
    styleUrls: ['../generic-bar/generic-bar.scss', './storage-bar.scss']
})
export class StorageBar {
    @Input() usage: ServerDataFullUsage

    private get deviation(): number {
        if (this.usage.total > 0)
            return (this.usage.total - this.usage.used - this.usage.free) / this.usage.total
        else
            return 0
    }

    private get proportion(): number {
        if (this.usage.total > 0)
            return Math.max(Math.min(this.usage.used / this.usage.total, 1), 0)
        else
            return 1
    }

}