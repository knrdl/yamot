import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SectionDirective } from './section.directive'
import { AlertDirective } from './alert.directive'


@NgModule({
    declarations: [
        AlertDirective,
        SectionDirective,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        AlertDirective,
        SectionDirective,
    ]
})
export class DirectiveModule { }