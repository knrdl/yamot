import { Component, Input, EventEmitter, Output } from '@angular/core'

@Component({
    selector: 'modal-header',
    templateUrl: 'generic-modal-header.html',
})
export class GenericModalHeader {
    @Input() title:string
    @Output() close:EventEmitter<void> = new EventEmitter<void>(true)

    private click(){
        this.close.emit()
    }
}