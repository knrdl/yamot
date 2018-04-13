import { Component, OnInit, OnDestroy } from '@angular/core'
import { DataService } from '../../../providers/data-service'
import { IChartistPieChart, Pie } from 'chartist'
import { GeneralChartDivision } from '../general-chart-division/general-chart-division'
import { ServerService } from '../../../providers/server-service'

@Component({
    selector: 'chart-pie',
    templateUrl: 'chart-pie-division.html',
    styleUrls: ['./chart-pie-division.scss']
})
export class ChartPieDivision extends GeneralChartDivision implements OnInit, OnDestroy {

    private pieChart: IChartistPieChart

    constructor(private dataService: DataService, protected serverService: ServerService) { super(serverService) }

    ngOnInit(): void {
        super.ngOnInit()
        this.pieChart = new Pie('.ct-pie-chart', {
            labels: this.onlineServer,
            series: this.series
        }, {
                height: 'calc( 90vh - 2rem)',
                labelInterpolationFnc: (svr: string) => svr,
                donut: true
            }
        )
    }

    ngOnDestroy(): void {
        super.ngOnDestroy()
    }

    private get onlineServer(): string[] {
        return this.dataService.server.filter(svr => svr.online === 'online').map(svr => svr.alias)
    }

    private get series(): number[] {
        return this.dataService.server.filter(svr => svr.online === 'online' && svr.data && svr.data.time && svr.data.time.up).map(svr => svr.data.time.up)
    }

    protected updateChart(): void {
        this.pieChart.update({
            labels: this.onlineServer,
            series: this.series
        })
    }

}