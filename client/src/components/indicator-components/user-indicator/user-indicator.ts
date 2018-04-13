import { Component, Input } from '@angular/core'
import { ServerDataUser } from '../../../model/ServerData'

@Component({
    selector: 'user-indicator',
    templateUrl: 'user-indicator.html',
})
export class UserIndicator {
    @Input() users: ServerDataUser[]
}