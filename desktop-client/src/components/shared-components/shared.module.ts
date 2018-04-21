import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Header } from './header/header'
import { DialogModule } from '../dialog-components/dialog.module'
import { Expander } from './expander/expander'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { TabLink } from './tab-link/tab-link'


@NgModule({
    declarations: [
        Header,
        Expander,
        TabLink,
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        DialogModule
    ],
    exports: [
        Header,
        Expander,
        TabLink,
    ]
})
export class SharedModule { }