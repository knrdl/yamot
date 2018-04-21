import { Component, Input } from '@angular/core'
import { ServerDataBat, ServerDataNetWifiStrength } from '../../../model/ServerData'

@Component({
    selector: 'mobile-indicator',
    templateUrl: 'mobile-indicator.html',
})
export class MobileIndicator {
    @Input() bat: ServerDataBat
    @Input() wifi: ServerDataNetWifiStrength[]

    private connectedWifis(): ServerDataNetWifiStrength[]{
        return this.wifi.filter((w:ServerDataNetWifiStrength) => w[0] && w[1])
    }

}