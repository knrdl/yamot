import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ServiceIndicator } from './service-indicator/service-indicator'
import { UserIndicator } from './user-indicator/user-indicator'
import { CpuIndicator } from './cpu-indicator/cpu-indicator'
import { TempIndicator } from './temp-indicator/temp-indicator'
import { BarModule } from '../bar-components/bar.module'
import { TimeIndicator } from './time-indicator/time-indicator'
import { PipesModule } from '../../pipes/pipes.module'
import { SystemIndicator } from './system-indicator/system-indicator'
import { MobileIndicator } from './mobile-indicator/mobile-indicator'
import { LoadIndicator } from './load-indicator/load-indicator'
import { NetworkIndicator } from './network-indicator/network-indicator'
import { DialogModule } from '../dialog-components/dialog.module'
import { StorageIndicator } from './storage-indicator/storage-indicator'
import { DiskIndicator } from './disk-indicator/disk-indicator'
import { SharedModule } from '../shared-components/shared.module'
import { DirectiveModule } from '../../directives/directive.module'

@NgModule({
    declarations: [
        CpuIndicator,
        DiskIndicator,
        LoadIndicator,
        MobileIndicator,
        NetworkIndicator,
        ServiceIndicator,
        StorageIndicator,
        SystemIndicator,
        TempIndicator,
        TimeIndicator,
        UserIndicator,
    ],
    imports: [
        BarModule,
        CommonModule,
        DirectiveModule,
        DialogModule,
        PipesModule,
        SharedModule,
    ],
    exports: [
        CpuIndicator,
        DiskIndicator,
        LoadIndicator,
        MobileIndicator,
        NetworkIndicator,
        ServiceIndicator,
        StorageIndicator,
        SystemIndicator,
        TempIndicator,
        TimeIndicator,
        UserIndicator,
    ]
})
export class IndicatorModule { }
