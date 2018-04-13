import { Component, Input } from '@angular/core'

@Component({
    selector: 'bar',
    templateUrl: 'generic-bar.html',
    styleUrls: ['./generic-bar.scss']
})
export class GenericBar {
    @Input() text: string = ''
    @Input() usage: number = 0
    
    private get proportion(): number {
        return Math.max(Math.min(this.usage, 1), 0)
    }

}