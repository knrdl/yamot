import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { ServerDialog } from './server-dialog/server-dialog'
import { SettingsDialog } from './settings-dialog/settings-dialog'
import { ServerSettingsDialog } from './serversettings-dialog/serversettings-dialog'
import { NetworkDialog } from './network-dialog/network-dialog'
import { PipesModule } from '../../pipes/pipes.module'
import { StorageDialog } from './storage-dialog/storage-dialog'
import { BarModule } from '../bar-components/bar.module'
import { GenericModal } from './generic-modal/generic-modal'
import { GenericModalHeader } from './generic-modal-header/generic-modal-header'


@NgModule({
    declarations: [
        GenericModal,
        GenericModalHeader,
        NetworkDialog,
        ServerDialog,
        ServerSettingsDialog,
        SettingsDialog,
        StorageDialog,
    ],
    imports: [
        BarModule,
        CommonModule,
        FormsModule,
        PipesModule,
        ReactiveFormsModule,
    ],
    exports: [
        NetworkDialog,
        ServerDialog,
        ServerSettingsDialog,
        SettingsDialog,
        StorageDialog,
    ]
})
export class DialogModule { }