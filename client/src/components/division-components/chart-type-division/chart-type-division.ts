import { Component, Output, EventEmitter } from '@angular/core'

export type ChartType = 'bar' | 'pie' | 'line'

@Component({
    selector: 'chart-type',
    templateUrl: 'chart-type-division.html',
    styleUrls: ['./chart-type-division.scss']
})
export class ChartTypeDivision {
    @Output() selected: EventEmitter<ChartType> = new EventEmitter<ChartType>(true)

    private type: ChartType = 'bar'

    private setType(t: ChartType): void {
        if (this.type !== t) {
            this.type = t
            this.selected.emit(t)
        }
    }

}