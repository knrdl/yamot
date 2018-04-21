import { Injectable } from '@angular/core'
import { Server } from '../model/Server'
import { Settings } from '../model/Settings'
import { Credentials } from '../model/Credentials'
import { ControllerConfig, ControllerServer } from '../model/Controller'
import { Observable } from 'rxjs'

// var fs = (window as any).require('fs')
var storage = (window as any).require('electron-json-storage')
// const CONF_FILE: string = 'yamot_config.json'

@Injectable()
export class DataService {

    constructor() {
        window.onblur = () => this.updating = (this.settings.windowUpdates === 'always') //keep updating when set to always
        window.onfocus = () => this.updating = true
    }

    public server: Server[] = []

    public get settings(): Settings {
        return this.config.settings
    }

    public updating: boolean = true

    public serverVisible: { [alias: string]: boolean } = {}

    public config: ControllerConfig = new ControllerConfig()

    public loadConfig(): Observable<void> {
        return Observable.create(observer => {
            storage.has('config', (error, hasKey) => {
                if (error) {
                    console.error('Error loading conf:', error)
                    observer.error(error)
                    observer.complete()
                } else if (hasKey) {
                    storage.get('config', (error, data) => {
                        if (error) {
                            console.error('Error loading conf:', error)
                            observer.error(error)
                            observer.complete()
                        } else {
                            this.config = data
                            this.config.settings = Object.assign(new Settings(), this.config.settings)
                            this.config.server = this.config.server.map(svr => Object.assign(new ControllerServer(), svr))
                            delete this.server
                            this.server = this.config.server.map(svr => Object.assign(new Server(), svr))
                            observer.next()
                            observer.complete()
                        }
                    })
                }
            })

            // fs.exists(CONF_FILE, (exists: boolean) => {
            //     if (exists)
            //         fs.readFile(CONF_FILE, 'utf8', (err, data) => {
            //             if (err) {
            //                 console.error('Error loading conf:', err)
            //                 observer.error()
            //                 observer.complete()
            //             } else {
            //                 this.config = JSON.parse(data)
            //                 delete this.server
            //                 this.server = this.config.server.map(svr => Object.assign(new Server(), svr))
            //                 observer.next()
            //                 observer.complete()
            //             }
            //         })
            //     else{
            //         this.saveConfig() //persist new config
            //         observer.next()
            //         observer.complete()
            //     }
            // })
        })
    }

    public saveConfig(): void {

        storage.set('config', this.config, (error) => {
            if (error) console.error('Error persisting conf:', error)
        })

        // fs.writeFile(CONF_FILE, JSON.stringify(this.config), (err) => {
        //     if (err)
        //         console.error('Error persisting conf:', err)
        // })
    }
}
