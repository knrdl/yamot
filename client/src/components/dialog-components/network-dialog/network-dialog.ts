import { Component, Input } from '@angular/core'
import { GenericDialog } from '../generic-dialog/generic-dialog'
import { ServerDataNetAddrObj, ServerDataNetIoObj } from '../../../model/ServerData'

@Component({
    selector: 'network-dialog',
    templateUrl: 'network-dialog.html',
    styleUrls: ['../generic-dialog/generic-dialog.scss']
})
export class NetworkDialog extends GenericDialog {
    @Input() addr: ServerDataNetAddrObj
    @Input() io: ServerDataNetIoObj
    @Input() ifaces: string[]

    constructor() { super() }
}