import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { DataService } from './data-service'
import { CanActivate, Router } from '@angular/router'

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private dataService: DataService, private router: Router) { }

    canActivate(): Observable<boolean> {
        return Observable.create(observer => {
            if (this.dataService.credentials && this.dataService.credentials.valid) {
                observer.next(true)
            } else {
                this.router.navigate(['login'])
                observer.next(false)
            }
            observer.complete()
        })
    }
}