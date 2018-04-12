import { Router, Request, Response } from "express"
import { app } from "../main"
import { config } from "../utils/conf"
import { ConfigModel, ServerModel } from "../utils/model";

export const restServer = Router()

const attrs: string[] = ['alias', 'addr', 'user', 'pw', 'description', 'port', 'powerSupply', 'averageCurrent']


export function server_list(): ServerModel[] {
	return config().server.sort((a: any, b: any) => {
		let x: string = a.alias.toLowerCase()
		let y: string = b.alias.toLowerCase()
		return ((x < y) ? -1 : ((x > y) ? 1 : 0))
	})
}


restServer.get("/", (req: Request, res: Response) => {
    res.status(200).send({ data: server_list() })
})

restServer.put("/", (req: Request, res: Response) => {
    if (Array.isArray(req.body) && req.body.every((server) => (
        ['alias', 'addr', 'user', 'pw', 'description'].every(
            attr => typeof server[attr] === 'string' && (server[attr].length > 0 || attr === 'description')
        ) && 
        ['port', 'powerSupply', 'averageCurrent'].every(attr => typeof server[attr] === 'number' && server[attr] >= 0) && 
        !server.alias.includes('/') && 
        ![':', '/', '?', '#', '&'].some(chr => server.addr.includes(chr))
    ))) {
        let settings: ConfigModel = config()
        settings.server = []
        req.body.forEach(server => {
            let tmp: any = {}
            attrs.forEach((attr: string) => tmp[attr] = server[attr])
            settings.server.push(Object.assign(new ServerModel(), tmp))
        })
        app.get('yamot_save_settings')()
        res.status(200).send({data: server_list()})
    } else {
        res.status(400).send()
    }

})

restServer.put('/:alias/description', (req: Request, res: Response) => {
    let alias: string = req.params.alias
    let desc: string = req.body.description
    if (typeof alias === 'string' && alias.length > 0 && typeof desc === 'string') {
        let svr: ServerModel = config().server.find(svr => svr.alias === alias)
        if (svr) {
            svr.description = desc
            app.get('yamot_save_settings')()
            res.status(200).send()
        } else {
            res.status(404).send()
        }
    } else {
        res.status(400).send()
    }
})

restServer.put('/:alias/power', (req: Request, res: Response) => {
    let alias: string = req.params.alias
    if (
        ((typeof req.body.volts === 'number' && req.body.volts >= 0) || req.body.volts === null)
        && ((typeof req.body.ampere === 'number' && req.body.ampere >= 0) || req.body.ampere === null)
        && typeof alias === 'string' && alias.length > 0
    ) {
        let svr: ServerModel = config().server.find(svr => svr.alias === alias)
        if (svr) {
            svr.powerSupply = req.body.volts
            svr.averageCurrent = req.body.ampere
            app.get('yamot_save_settings')()
            res.status(200).send()
        } else {
            res.status(404).send()
        }
    } else {
        res.status(400).send()
    }
})