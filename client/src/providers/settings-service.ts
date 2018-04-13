import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { RestService } from './rest-service'
import { DataService } from './data-service'
import { Settings } from '../model/Settings'

@Injectable()
export class SettingsService {

    constructor(private restService: RestService, private dataService: DataService) { }

    updateSettings(settings: Settings): Observable<void> {
        return Observable.create(observer => {
            this.restService.call('settings', {
                method: 'put',
                body: settings,
            }).subscribe(() => {
                this.dataService.settings = settings
                observer.next()
                observer.complete()
            }, (error) => {
                observer.error(error)
                observer.complete()
            })
        })
    }

}
