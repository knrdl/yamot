import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { RestService } from './rest-service'
import { DataService } from './data-service'
import { Settings } from '../model/Settings'

@Injectable()
export class SettingsService {

    constructor(private dataService: DataService) { }

    updateSettings(settings: Settings): Observable<void> {
        return Observable.create(observer => {
            this.dataService.config.settings = settings
            this.dataService.saveConfig()
            observer.next()
            observer.complete()
        })

    }

}
