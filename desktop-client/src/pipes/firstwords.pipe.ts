import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'firstwords'
})
export class FirstWordsPipe implements PipeTransform {

    transform(text: string, displayChars: number = 100, splitter: string = ' '): string | boolean {
        let out: string = ''
        if (text) {
            let splitted: string[] = text.split(splitter)
            for (let i = 0; i < splitted.length; i++) {
                const word: string = splitted[i]

                if (out.length + word.length + splitter.length + 2 <= displayChars) {
                    if (out.length > 0) {
                        out += splitter + word
                    } else {
                        out = word
                    }
                } else if (out.length + 2 <= displayChars && out.length != text.length) {
                    out += ' …'
                    break
                }
            }
            return out
        }
        return false
    }
}
