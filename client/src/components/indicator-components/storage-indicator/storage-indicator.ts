import { Component, Input } from '@angular/core'
import { ServerDataDiskStore } from '../../../model/ServerData'

@Component({
    selector: 'storage-indicator',
    templateUrl: 'storage-indicator.html',
})
export class StorageIndicator {
    @Input() store: ServerDataDiskStore[]

    private showDialog: boolean = false

}