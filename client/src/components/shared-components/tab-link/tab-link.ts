import { Component, Input } from '@angular/core'

@Component({
    selector: 'tab-link',
    templateUrl: 'tab-link.html',
    styleUrls: ['./tab-link.scss'],
})
export class TabLink {
    @Input() href: string
}