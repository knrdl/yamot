import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { RestService } from '../providers/rest-service'
import { ServerService } from '../providers/server-service'
import { HttpClientModule } from '@angular/common/http'
import { DataService } from '../providers/data-service'
import { BarModule } from '../components/bar-components/bar.module'
import { IndicatorModule } from '../components/indicator-components/indicator.module'
import { PipesModule } from '../pipes/pipes.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DialogModule } from '../components/dialog-components/dialog.module'
import { SharedModule } from '../components/shared-components/shared.module'
import { SettingsService } from '../providers/settings-service'
import { PagesModule } from '../pages/pages.module'
import { DirectiveModule } from '../directives/directive.module'
import { DivisionModule } from '../components/division-components/division.module'
import { NetService } from '../providers/net-service'

import './app-icon.module'
import { LegendModule } from '../components/legend-components/legend.module'

// import { registerLocaleData } from '@angular/common'
// import localeDe from '@angular/common/locales/de'
// registerLocaleData(localeDe, 'de')

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    AppRoutingModule,

    BarModule,
    DialogModule,
    DirectiveModule,
    DivisionModule,
    IndicatorModule,
    LegendModule,
    PagesModule,
    PipesModule,
    SharedModule
  ],
  providers: [
    DataService,
    RestService,
    ServerService,
    NetService,
    SettingsService,

    // { provide: LOCALE_ID, useValue: 'de' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
