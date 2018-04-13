import { Component, Input } from '@angular/core'
import { Observable, Subscription } from 'rxjs/Rx'
import { ServerService } from '../../../providers/server-service'
import { Server } from '../../../model/Server'
import { DataService } from '../../../providers/data-service'

@Component({
    selector: 'board-server',
    templateUrl: 'board-server-division.html',
    styleUrls: ['./board-server-division.scss'],
})
export class BoardServerDivision {
    @Input() s: Server

    private showDialog: boolean = false

    private saveDescriptionTimeout: Subscription

    constructor(private serverService: ServerService, private dataService: DataService) { }

    private saveDescription(): void {
        if (this.saveDescriptionTimeout) {
            this.saveDescriptionTimeout.unsubscribe()
        }
        this.saveDescriptionTimeout = Observable.create(() => { })
            .timeoutWith(1000, Observable.empty())
            .subscribe(null, null, () => {
                this.serverService.updateDescription(this.s).subscribe()
            })
    }
}