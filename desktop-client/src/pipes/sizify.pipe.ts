import { Pipe, PipeTransform } from '@angular/core'
import { DataService } from '../providers/data-service'
import { SizePrefix } from '../model/Settings'

type Prefix = '' | 'K' | 'M' | 'G' | 'T' | 'P' | 'E' | 'Z' | 'Y'

const prefix = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

@Pipe({
    name: 'sizify'
})
export class SizifyPipe implements PipeTransform {

    constructor(private dataService: DataService) { }

    transform(value: number, unit: string = 'B', sizeFactor?: SizePrefix, startFactor: Prefix = ''): string {
        let fac: number
        if (sizeFactor) fac = sizeFactor
        else fac = this.dataService.settings.sizeFactor
        let i: number = prefix.indexOf(startFactor)
        while (value >= fac) {
            value /= fac
            i++
        }
        let rnd = 3 - (Math.round(value) + '').length
        return (Math.round(value * Math.pow(10, rnd)) / Math.pow(10, rnd))
            + ' '
            + prefix[i]
            + (prefix[i] == '' || fac == 1000 ? unit : 'i' + unit)
    }
}
