import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { DialogModule } from '../dialog-components/dialog.module'
import { IndicatorModule } from '../indicator-components/indicator.module'
import { DirectiveModule } from '../../directives/directive.module'
import { FormsModule } from '@angular/forms'
import { LineItemLegend } from './line-item-legend/line-item-legend'
import { ServerSelectLegend } from './server-select-legend/server-select-legend'
import { ServerOnlineUptimeLegend } from './server-online-uptime-legend/server-online-uptime-legend'
import { ServerOnlineSelectLegend } from './server-online-select-legend/server-online-select-legend'
import { PipesModule } from '../../pipes/pipes.module'
import { ServerIfaceSelectLegend } from './server-iface-select-legend/server-iface-select-legend'

@NgModule({
    declarations: [
        LineItemLegend,
        ServerOnlineUptimeLegend,
        ServerIfaceSelectLegend,
        ServerOnlineSelectLegend,
        ServerSelectLegend,
    ],
    imports: [
        CommonModule,
        FormsModule,
        DialogModule,
        DirectiveModule,
        IndicatorModule,
        PipesModule,
    ],
    exports: [
        LineItemLegend,
        ServerOnlineUptimeLegend,
        ServerIfaceSelectLegend,
        ServerOnlineSelectLegend,
        ServerSelectLegend,
    ]
})
export class LegendModule { }