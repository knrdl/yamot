import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { GenericBar } from './generic-bar/generic-bar'
import { StorageBar } from './storage-bar/storage-bar'
import { PipesModule } from '../../pipes/pipes.module'
import { BatBar } from './bat-bar/bat-bar'
import { CpuBar } from './cpu-bar/cpu-bar'
import { TempBar } from './temp-bar/temp-bar'

@NgModule({
    declarations: [
        BatBar,
        CpuBar,
        GenericBar,
        StorageBar,
        TempBar
    ],
    imports: [
        CommonModule,
        PipesModule,
    ],
    exports: [
        BatBar,
        CpuBar,
        GenericBar,
        StorageBar,
        TempBar
    ]
})
export class BarModule { }