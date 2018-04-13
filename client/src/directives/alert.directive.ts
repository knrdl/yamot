import { Directive, ElementRef, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core'
import { Alert } from '../model/Alert'

@Directive({
  selector: '[appAlert]'
})
export class AlertDirective implements OnChanges {

  @Input() appAlert: Alert

  constructor(private elemRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {

    let obj: Alert = (changes.appAlert as SimpleChange).currentValue

    if (obj.danger) {
      this.elemRef.nativeElement.classList.remove('app-alert-warning')
      this.elemRef.nativeElement.classList.add('app-alert-danger')
      this.elemRef.nativeElement.title = 'This value may critical'
    } else if (obj.warning) {
      this.elemRef.nativeElement.classList.remove('app-alert-danger')
      this.elemRef.nativeElement.classList.add('app-alert-warning')
      this.elemRef.nativeElement.title = 'This value may borderline'
    } else {
      this.elemRef.nativeElement.classList.remove('app-alert-warning')
      this.elemRef.nativeElement.classList.remove('app-alert-danger')
      this.elemRef.nativeElement.title = ''
    }
  }

}
