import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'timify'
})
export class TimifyPipe implements PipeTransform {

    transform(s: number, displaySeconds: boolean = true): string {
        let m = Math.floor(s / 60)
        s = Math.round(s % 60)

        let h = Math.floor(m / 60)
        m = m % 60

        let d = Math.floor(h / 24)
        h = h % 24

        return (d + h + m + s > 0 ?
            ((d > 0 ? d + 'd ' : '')
                + (h > 0 ? h + 'h ' : '')
                + (m > 0 ? m + 'min ' : '')
                + (s > 0 && displaySeconds ? s + 's ' : ''))
            : '0s')
    }
}
