import { Component, EventEmitter, Output } from '@angular/core'

export class LineItems {

    private data: { title: string, name: string, value: boolean }[]

    constructor() {
        this.data = [
            { title: 'Load 1min', name: 'load1', value: true },
            { title: 'Load 5min', name: 'load5', value: true },
            { title: 'Load 15min', name: 'load15', value: true },
            { title: 'RAM', name: 'ram', value: true },
            { title: 'Swap', name: 'swap', value: true },
        ]
    }

    public get titles(): string[] {
        return this.data.map(entry => entry.title)
    }

    public set(title: string, value: boolean): void {
        this.data.find(entry => entry.title === title).value = value
    }

    public get(title: string): boolean {
        return this.data.find(entry => entry.title === title).value
    }

    public getByName(name: string): boolean {
        return this.data.find(entry => entry.name === name).value
    }

    public toggle(title: string): void {
        let val: boolean = this.data.find(entry => entry.title === title).value
        this.data.find(entry => entry.title === title).value = !val
    }
}

@Component({
    selector: 'line-item-legend',
    templateUrl: 'line-item-legend.html',
    styleUrls: ['./line-item-legend.scss'],
})
export class LineItemLegend {
    @Output() changed: EventEmitter<LineItems> = new EventEmitter<LineItems>(true)

    private legend: LineItems = new LineItems()

    private update(entry: string): void {
        this.legend.toggle(entry)
        this.changed.emit(this.legend)
    }
}