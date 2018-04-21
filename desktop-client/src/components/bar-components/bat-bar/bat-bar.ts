import { Component, Input } from '@angular/core'

@Component({
    selector: 'bat-bar',
    templateUrl: 'bat-bar.html',
    styleUrls: ['../generic-bar/generic-bar.scss', './bat-bar.scss']
})
export class BatBar {
    @Input() percent: number = 0

}