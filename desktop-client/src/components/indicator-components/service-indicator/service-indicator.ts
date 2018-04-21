import { Component, Input } from '@angular/core'
import { ServerDataNetService } from '../../../model/ServerData'
import { NetService } from '../../../providers/net-service'

@Component({
    selector: 'service-indicator',
    templateUrl: 'service-indicator.html',
})
export class ServiceIndicator {
    @Input() services: ServerDataNetService[]
    @Input() hostname: string

    constructor(private netService: NetService) { }

    private guessport(port: number): string {
        let val = this.netService.lookupPort(port)
        return (val ? '('+val+')' : '')
    }

}