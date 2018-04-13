import { Component, Input } from '@angular/core'

@Component({
    selector: 'cpu-bar',
    templateUrl: 'cpu-bar.html',
    styleUrls: ['./cpu-bar.scss']
})
export class CpuBar {
    @Input() user: number
    @Input() sys: number

}