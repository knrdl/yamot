import { Router, Request, Response } from "express"
import { app } from "../main"
import { config } from "../utils/conf"
import { server_list } from "./server"

export const restAuth = Router()

restAuth.put("/", (req: Request, res: Response) => {
    if (['oldUsername', 'oldPassword', 'newUsername', 'newPassword'].every((key: string) =>
        (typeof req.body[key] === 'string' && req.body[key].length > 0)
    ) && req.body.oldPassword.length >= 6 && req.body.newPassword.length >= 6 && !req.body.newUsername.includes(':')) {
        if (req.body.oldUsername == config().username && req.body.oldPassword == config().password) {
            config().username = req.body.newUsername
            config().password = req.body.newPassword
            app.get('yamot_save_settings')()
            res.status(200).send()
        } else {
            res.status(403).send()
        }
    } else {
        res.status(400).send()
    }
})

restAuth.post("/", (req: Request, res: Response) => {
    if (typeof req.body.username === 'string' && req.body.username.length > 0 && typeof req.body.password === 'string' && req.body.password.length > 0) {
        if (req.body.username == config().username && req.body.password == config().password) {
            res.status(200).send({
                data: {
                    settings: config().settings,
                    server: server_list()
                }
            })
        } else {
            res.status(403).send()
        }
    } else {
        res.status(400).send()
    }
})
