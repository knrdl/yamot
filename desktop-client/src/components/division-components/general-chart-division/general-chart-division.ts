import { OnInit, OnDestroy } from '@angular/core'
import { ServerService } from '../../../providers/server-service'

export class ChartData {
    className: string
    data: number[]
}

export abstract class GeneralChartDivision implements OnInit, OnDestroy {

    private hookFn: Function = () => this.updateChart()

    constructor(protected serverService: ServerService) { }

    ngOnInit(): void {
        this.serverService.hookServerMeasurements(this.hookFn)
    }

    ngOnDestroy(): void {
        this.serverService.unhookServerMeasurements(this.hookFn)
    }

    protected updateChart(): void {
    }

}