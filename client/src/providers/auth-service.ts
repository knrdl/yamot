import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { RestService } from './rest-service'
import { DataService } from './data-service'
import { Credentials, CredentialsChange } from '../model/Credentials'
import { Server } from '../model/Server'
import { Settings } from '../model/Settings'
import { LoginData } from '../model/LoginData'
import { ServerService } from './server-service'

@Injectable()
export class AuthService {

    constructor(
        private restService: RestService,
        private serverService: ServerService,
        private dataService: DataService,
    ) { }

    changeCredentials(credCh: CredentialsChange): Observable<void> {
        return Observable.create(observer => {
            this.restService.call('auth', { method: 'put', body: credCh }).subscribe(() => {
                this.dataService.credentials = credCh.asNewCredentials()
                this.saveCredentials().subscribe()
                observer.next()
                observer.complete()
            }, (error) => {
                observer.error(error)
                observer.complete()
            })
        })
    }

    saveCredentials(): Observable<void> {
        return Observable.create(observer => {
            sessionStorage.setItem('username', this.dataService.credentials.username)
            sessionStorage.setItem('password', this.dataService.credentials.password)
            observer.next()
            observer.complete()
        })
    }

    readCredentials(): Observable<Credentials | void> {
        return Observable.create(observer => {
            let cred: Credentials = new Credentials(sessionStorage.getItem('username'), sessionStorage.getItem('password'))
            if (cred.valid) {
                observer.next(cred)
                observer.complete()
            } else {
                observer.error()
                observer.complete()
            }
        })
    }

    logout(): Observable<void> {
        return Observable.create(observer => {
            delete this.dataService.credentials.username
            delete this.dataService.credentials.password
            delete this.dataService.credentials
            this.serverService.stopServerMeasurements()
            sessionStorage.removeItem('username')
            sessionStorage.removeItem('password')
            observer.next()
            observer.complete()
        })
    }

    login(cred: Credentials): Observable<void> {
        return Observable.create(observer => {
            this.restService.call('auth', { method: 'post', body: cred, type: LoginData }).subscribe((data: LoginData) => {
                this.dataService.credentials = cred
                this.dataService.server = data.server.map(svr => Object.assign(new Server(), svr))
                this.dataService.settings = Object.assign(new Settings(), data.settings)
                this.saveCredentials().subscribe()
                this.serverService.startServerMeasurements()
                observer.next()
                observer.complete()
            }, (error) => {
                observer.error(error)
                observer.complete()
            })
        })
    }

}
