import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { environment } from '../environments/environment'
import { DataService } from './data-service'
import { Credentials } from '../model/Credentials'
import { Server } from '../model/Server';

interface Envelope {
    data: any
}

@Injectable()
export class RestService {

    constructor(private http: HttpClient) { }

    public get(server: Server, type: { new() }): Observable<Envelope["data"]> {
        return Observable.create(observer => {
            let headers = new HttpHeaders()
            if (server.user && server.pw)
                headers = headers.append("Authorization", "Basic " + btoa(`${server.user}:${server.pw}`))

            this.http.get<Envelope>(`http://${server.addr}:${server.port}/`, {
                headers: headers
            }).subscribe((result: Envelope) => {
                observer.next(Object.assign(new type(), result.data))
                observer.complete()

            }, (error: HttpErrorResponse) => {
                observer.error(error)
                observer.complete()
            })
        })
    }

}