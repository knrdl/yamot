import { Component, OnInit, OnDestroy } from '@angular/core'
import { DataService } from '../../../providers/data-service'
import { IChartistLineChart, Line } from 'chartist'
import { ServerService } from '../../../providers/server-service'
import { Server } from '../../../model/Server'
import { SizifyPipe } from '../../../pipes/sizify.pipe'
import { GeneralChartDivision } from '../general-chart-division/general-chart-division'

@Component({
    selector: 'chart-line',
    templateUrl: 'chart-line-division.html',
    styleUrls: ['./chart-line-division.scss']
})
export class ChartLineDivision extends GeneralChartDivision implements OnInit, OnDestroy {

    private lineChart: IChartistLineChart

    private choosenSvr: string
    private choosenIface: string

    private rxVals: number[] = []
    private txVals: number[] = []
    private counter: number = 0

    constructor(private dataService: DataService, protected serverService: ServerService) { super(serverService) }

    ngOnInit(): void {
        super.ngOnInit()
        let sizify = new SizifyPipe(this.dataService)
        this.lineChart = new Line('.ct-line-chart', {
            labels: this.labels(),
            series: [[], []]
        }, {
                height: 'calc( 90vh - 2rem)',
                axisY: {
                    labelInterpolationFnc: (value: number) => sizify.transform(value),
                    onlyInteger: true,
                    offset: 80
                }
            }
        )
    }

    ngOnDestroy(): void {
        super.ngOnDestroy()
    }

    private labels(): string[] {
        let out: string[] = []
        for (let i = this.counter - this.rxVals.length; i < this.counter - 1; i++) {
            out.push(`${i * this.dataService.settings.updateInterval}s`)
        }
        return out
    }

    private setIface(iface: string): void {
        delete this.rxVals
        this.rxVals = []
        delete this.txVals
        this.txVals = []
        this.choosenIface = iface
        this.counter = 0
        this.updateChart()
    }

    private getRx(): number[] {
        let rx: number[] = []
        for (let i = 1; i < this.rxVals.length; i++) {
            rx.push(this.rxVals[i] - this.rxVals[i - 1])
        }
        return rx
    }

    private getTx(): number[] {
        let tx: number[] = []
        for (let i = 1; i < this.txVals.length; i++) {
            tx.push(this.txVals[i] - this.txVals[i - 1])
        }
        return tx
    }

    protected updateChart(): void {
        if (this.choosenSvr && this.choosenIface) {
            let svr: Server = this.dataService.server.find(svr => svr.alias === this.choosenSvr)
            if (svr && svr.data && svr.data.net && svr.data.net.io && svr.data.net.io[this.choosenIface]) {
                this.rxVals.push(svr.data.net.io[this.choosenIface].byte.rx)
                this.txVals.push(svr.data.net.io[this.choosenIface].byte.tx)
                this.counter++
                while (this.rxVals.length * this.dataService.settings.updateInterval > 60) {
                    this.rxVals.shift()
                    this.txVals.shift()
                }
            }
        }

        this.lineChart.update({
            labels: this.labels(),
            series: [{ className: 'ct-series-f', data: this.getRx() }, { className: 'ct-series-g', data: this.getTx() }]
        })
    }
}