import { Pipe, PipeTransform } from '@angular/core'
import { DataService } from '../providers/data-service'
import { SizifyPipe } from './sizify.pipe'

@Pipe({
    name: 'speedify'
})
export class SpeedifyPipe implements PipeTransform {

    constructor(private dataService: DataService) { }

    transform(value: number): string {
        return new SizifyPipe(this.dataService).transform(
            Math.round(value * this.dataService.settings.speedFactor),
            this.dataService.settings.speedFactor == 8 ? 'Bit/s' : 'B/s'
        )
    }
}
