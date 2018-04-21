import { Component, Input } from '@angular/core'

@Component({
    selector: 'modal',
    templateUrl: 'generic-modal.html',
    styleUrls: ['./generic-modal.scss']
})
export class GenericModal {
    @Input() large: boolean = false
}