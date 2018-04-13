import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core'

@Directive({
  selector: '[appSectionCondition]'
})
export class SectionDirective {
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, ) { }

  private embedded: boolean = false

  private testcondition(condition): boolean {
    switch (typeof condition) {
      case 'number': return !isNaN(condition)
      case 'boolean': return condition
      case 'string': return condition.length > 0
      case 'undefined': return false
      case 'object':
        switch (true) {
          case ((Array.isArray && Array.isArray(condition)) || condition instanceof Array):
            return condition.length > 0
          case (condition === null):
            return false
          default:
            return Object.keys(condition).length > 0
        }
      default:
        console.warn('unexpected condition value', condition)
        return false
    }
  }

  @Input() set appSectionCondition(conditions: (number | string | object | boolean)[]) {
    if (conditions.some(condition => this.testcondition(condition))) {
      if (!this.embedded) {
        this.embedded = true
        this.viewContainer.createEmbeddedView(this.templateRef)

        let elem = this.viewContainer.element.nativeElement
        let hr = document.createElement('hr')
        hr.className = 'my-2'
        elem.parentNode.insertBefore(hr, elem.nextSibling.nextSibling)
      }
    } else if (this.embedded) {
      this.embedded = false
      this.viewContainer.clear()
    }

  }
}
