import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { environment } from '../environments/environment'
import { DataService } from './data-service'
import { Credentials } from '../model/Credentials'

interface Envelope {
    data: any
}

interface RestRequestOptions {
    type?: { new() }
    method?: "get" | "post" | "put" | "patch" | "delete"
    params?: HttpParams
    body?: object | object[]
    destination?: 'internal' | 'external'
    auth?: Credentials
}

@Injectable()
export class RestService {

    constructor(private http: HttpClient, private dataService: DataService) { }

    public call(url: string, options: RestRequestOptions = {}): Observable<Envelope["data"]> {
        return Observable.create(observer => {
            let headers = new HttpHeaders()
            options.auth = options.auth || this.dataService.credentials
            if (options.auth && options.auth.valid)
                headers = headers.append("Authorization", "Basic " + btoa(`${options.auth.username}:${options.auth.password}`))

            this.http.request<Envelope>(options.method || 'get', ((options.destination || 'internal') == 'internal' ? environment.serviceUrl : '') + url, {
                headers: headers,
                body: options.body,
                params: options.params,
            }).subscribe((result: Envelope) => {
                let data: object | object[]
                if (options.type) {
                    if (Array.isArray(result.data)) {
                        data = result.data.map(item => Object.assign(new options.type(), item))
                    } else {
                        data = Object.assign(new options.type(), result.data)
                    }
                } else if (result instanceof Object && 'data' in result) {
                    data = result.data
                } else {
                    observer.next()
                    observer.complete()
                }
                observer.next(data)
                observer.complete()

            }, (error: HttpErrorResponse) => {
                observer.error(error)
                observer.complete()
            })
        })
    }

}