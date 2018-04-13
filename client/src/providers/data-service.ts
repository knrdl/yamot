import { Injectable } from '@angular/core'
import { Server } from '../model/Server'
import { Settings } from '../model/Settings'
import { Credentials } from '../model/Credentials'

@Injectable()
export class DataService {

    public credentials: Credentials

    public server: Server[] = []

    public settings: Settings = new Settings()

    public updating: boolean = true

    public serverVisible: { [alias: string]: boolean } = {}

    constructor() {
        window.onblur = () => this.updating = (this.settings.windowUpdates === 'always') //keep updating when set to always
        window.onfocus = () => this.updating = true
    }

}
