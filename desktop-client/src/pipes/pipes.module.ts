import { NgModule } from '@angular/core'
import { SizifyPipe } from './sizify.pipe'
import { TimifyPipe } from './timify.pipe'
import { FirstWordsPipe } from './firstwords.pipe'
import { SpeedifyPipe } from './speedify.pipe'


@NgModule({
    declarations: [
        FirstWordsPipe,
        SizifyPipe,
        SpeedifyPipe,
        TimifyPipe
    ],
    exports: [
        FirstWordsPipe,
        SizifyPipe,
        SpeedifyPipe,
        TimifyPipe
    ],
    imports: [
        
    ],
    providers: [
        
    ]
})
export class PipesModule { }