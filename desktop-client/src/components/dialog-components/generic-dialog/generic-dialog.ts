import { Input, Output, EventEmitter, HostListener } from '@angular/core'

export abstract class GenericDialog {
    private _show: boolean = false
    @Input() public set show(s: boolean) {
        this._show = s
        if (s) this.init()
    }
    public get show(): boolean {
        return this._show
    }
    @Output() public showChange: EventEmitter<void> = new EventEmitter(true)

    protected init(): void { }

    protected close(): void {
        this.show = false
        this.showChange.emit()
    }

    @HostListener('body:keyup', ['$event']) //close dialog on escape key
    handleKeyboardEvent(event: KeyboardEvent) {
        if ((event.which || event.keyCode) == 27 && this.show) //escape is 27
            this.close() //child class call on inheritance
    }

}