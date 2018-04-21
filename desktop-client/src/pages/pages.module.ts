import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BoardPage } from './board/board'
import { ChartsPage } from './charts/charts'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../components/shared-components/shared.module'
import { DivisionModule } from '../components/division-components/division.module'


@NgModule({
    declarations: [
        BoardPage,
        ChartsPage,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        DivisionModule,
        SharedModule,
    ],
    exports: [
        BoardPage,
        ChartsPage,
    ]
})
export class PagesModule { }