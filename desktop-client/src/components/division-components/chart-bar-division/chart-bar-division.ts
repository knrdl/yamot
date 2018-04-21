import { Component, OnInit, OnDestroy } from '@angular/core'
import { LineItems } from '../../legend-components/line-item-legend/line-item-legend'
import { Server } from '../../../model/Server'
import { DataService } from '../../../providers/data-service'
import { IChartistBarChart, Bar } from 'chartist'
import { ServerService } from '../../../providers/server-service'
import { GeneralChartDivision, ChartData } from '../general-chart-division/general-chart-division'

@Component({
    selector: 'chart-bar',
    templateUrl: 'chart-bar-division.html',
    styleUrls: ['./chart-bar-division.scss']
})
export class ChartBarDivision extends GeneralChartDivision implements OnInit, OnDestroy {

    private barChart: IChartistBarChart

    private lineLegend: LineItems = new LineItems()

    private shownServer: string[] = []
    private hiddenServer: string[] = []

    constructor(private dataService: DataService, protected serverService: ServerService) { super(serverService) }

    ngOnInit(): void {
        super.ngOnInit()
        this.dataService.server.forEach(
            (svr: Server) => (svr.online === 'online' && this.dataService.serverVisible[svr.alias] !== false) ?
                this.shownServer.push(svr.alias) : this.hiddenServer.push(svr.alias)
        )

        this.barChart = new Bar('.ct-bar-chart', {
            labels: this.shownServer,
            series: this.getData()
        }, {
                seriesBarDistance: 10,
                horizontalBars: true,
                height: 'calc( 90vh - 2rem)',
                axisX: {
                    labelInterpolationFnc: (value: number) => `${value}%`,
                    onlyInteger: true
                },
            }
        )
    }

    ngOnDestroy(): void {
        super.ngOnDestroy()
    }

    private getLoad(i: number): number[] {
        return this.shownServer.map(alias => {
            let s: Server = this.dataService.server.find(svr => svr.alias === alias)
            if (s) {
                return (s.data && s.data.load && (s.data.cpu.cores.log || s.data.cpu.cores.phy)) ? Math.min((s.data.load[i] * 100) / (s.data.cpu.cores.log || s.data.cpu.cores.phy), 100) : null
            } else {
                return null
            }
        })
    }

    private getMem(kw: 'ram' | 'swap'): number[] {
        return this.shownServer.map(alias => {
            let s: Server = this.dataService.server.find(svr => svr.alias === alias)
            if (s) {
                return (s.data && s.data.mem && s.data.mem[kw]) ? (s.data.mem[kw].used * 100) / s.data.mem[kw].total : null
            } else {
                return null
            }
        })
    }

    private getData(): ChartData[] {
        let out: ChartData[] = []

        if (this.lineLegend.getByName('load1')) out.push({ className: 'ct-series-a', data: this.getLoad(0) })
        if (this.lineLegend.getByName('load5')) out.push({ className: 'ct-series-b', data: this.getLoad(1) })
        if (this.lineLegend.getByName('load15')) out.push({ className: 'ct-series-c', data: this.getLoad(2) })
        if (this.lineLegend.getByName('ram')) out.push({ className: 'ct-series-d', data: this.getMem('ram') })
        if (this.lineLegend.getByName('swap')) out.push({ className: 'ct-series-e', data: this.getMem('swap') })

        return out.reverse()
    }

    protected updateChart(): void {
        this.barChart.update({
            labels: this.shownServer,
            series: this.getData()
        })
    }

    private updateVisibleValues(model): void {
        this.lineLegend = model
        this.updateChart()
    }

    private hideServer(hideAlias: string) {
        if (typeof hideAlias === 'string') {
            this.shownServer = this.shownServer.filter(alias => alias !== hideAlias)
            this.hiddenServer.push(hideAlias)
            this.updateChart()
        }

    }

    private showServer(showAlias: string) {
        if (typeof showAlias === 'string') {
            this.hiddenServer = this.hiddenServer.filter(alias => alias !== showAlias)
            this.shownServer.push(showAlias)
            this.updateChart()
        }
    }

}