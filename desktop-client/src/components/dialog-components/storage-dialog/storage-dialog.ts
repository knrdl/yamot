import { Component, Input } from '@angular/core'
import { GenericDialog } from '../generic-dialog/generic-dialog'
import { ServerDataDiskStore } from '../../../model/ServerData'

@Component({
    selector: 'storage-dialog',
    templateUrl: 'storage-dialog.html',
    styleUrls: ['../generic-dialog/generic-dialog.scss']
})
export class StorageDialog extends GenericDialog {
    @Input() store: ServerDataDiskStore[]

    constructor() { super() }
}