import { Component, Input } from '@angular/core'
import { ServerDataMem, ServerDataLoad } from '../../../model/ServerData'

@Component({
    selector: 'load-indicator',
    templateUrl: 'load-indicator.html',
})
export class LoadIndicator {
    @Input() load: ServerDataLoad
    @Input() mem: ServerDataMem
    @Input() cpucores: number

}