import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { DialogModule } from '../dialog-components/dialog.module'
import { IndicatorModule } from '../indicator-components/indicator.module'
import { DirectiveModule } from '../../directives/directive.module'
import { FormsModule } from '@angular/forms'
import { BoardServerDivision } from './board-server-division/board-server-division'
import { ChartTypeDivision } from './chart-type-division/chart-type-division'
import { ChartBarDivision } from './chart-bar-division/chart-bar-division'
import { LegendModule } from '../legend-components/legend.module'
import { ChartPieDivision } from './chart-pie-division/chart-pie-division'
import { ChartLineDivision } from './chart-line-division/chart-line-division'


@NgModule({
    declarations: [
        BoardServerDivision,
        ChartBarDivision,
        ChartLineDivision,
        ChartPieDivision,
        ChartTypeDivision,
    ],
    imports: [
        CommonModule,
        FormsModule,
        DialogModule,
        DirectiveModule,
        IndicatorModule,
        LegendModule,
    ],
    exports: [
        BoardServerDivision,
        ChartBarDivision,
        ChartLineDivision,
        ChartPieDivision,
        ChartTypeDivision,
    ]
})
export class DivisionModule { }