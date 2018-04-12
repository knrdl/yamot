import { Router, Request, Response } from "express"
import { app } from "../main"
import { config } from "../utils/conf"
import { ConfigModel, SettingsModel } from "../utils/model";

export const restSettings = Router()

const attrs: string[] = ['sizeFactor', 'speedFactor', 'windowUpdates', 'updateInterval', 'kWhPrice']

restSettings.put("/", (req: Request, res: Response) => {
    if (typeof req.body === 'object'
        && attrs.every((attr: string) => attr in req.body
            && (typeof req.body[attr] === 'number' || (attr == 'windowUpdates' && typeof req.body[attr] === 'string')))) {
        let conf: ConfigModel = config()
        conf.settings = new SettingsModel()
        let tmp:any = {}
        attrs.forEach((attr: string) => {
            tmp[attr] = req.body[attr]
        })
        conf.settings = Object.assign(conf.settings, tmp)
        app.get('yamot_save_settings')()
        res.status(200).send()
    } else {
        res.status(400).send()
    }

})