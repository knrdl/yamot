import { trigger, state, style, transition, animate } from '@angular/animations'
import { Component, Input } from '@angular/core'

@Component({
    selector: 'expander',
    templateUrl: 'expander.html',
    styleUrls: ['./expander.scss'],
    animations: [
        trigger('expandedMode', [
            state('EXPANDED_MODE', style({
                height: '*'
            })),
            state('REDUCED_MODE', style({
                 height: '0'
            })),
            transition('EXPANDED_MODE <=> REDUCED_MODE', animate('.33s ease-out'))
        ])
    ]
})
export class Expander {
    @Input() set expanded(b: boolean){
        this.mode = (b ? 'EXPANDED_MODE' : 'REDUCED_MODE')
    }

    private mode: 'EXPANDED_MODE' | 'REDUCED_MODE' = 'REDUCED_MODE'
}