import * as express from "express"
import * as path from "path"
import * as fs from "fs"
import { CONF_FILE, default_config, config } from "./utils/conf"

import { authFn } from './utils/auth'
import { restAuth } from "./rest/auth"
import { restServer } from "./rest/server"
import { restSettings } from "./rest/settings"

export const app = express()

app.set("port", process.env.PORT || 8080)
if (!process.env.PORT)
	console.info('Pass env PORT=XXXX to adjust port')

app.use(express.json())
app.use('/', express.static('static'))

// app.use((req, res, next) => { //fixme: disable cors in prod
// 	res.header('Access-Control-Allow-Origin', '*')
// 	res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')
// 	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
// 	if (req.method === 'OPTIONS') {
// 		res.send()
// 	} else {
// 		next()
// 	}
// })

//unprotected rest routes:
app.use("/rest/auth", restAuth)

app.use(authFn)

//protected rest routes:
app.use("/rest/server", restServer)
app.use("/rest/settings", restSettings)

const server = app.listen(app.get("port"), () => {
	app.set('yamot_save_settings', () => {
		fs.writeFile(CONF_FILE, JSON.stringify(app.get('yamot_config')), (err) => {
			if (err)
				console.log('Error persisting settings:', err)
		})
	})

	if (fs.existsSync(CONF_FILE)) {
		app.set('yamot_config', JSON.parse(fs.readFileSync(CONF_FILE, 'utf8')))
	} else {
		app.set('yamot_config', default_config())
		console.log()
		console.log('No config file found, created a new one')
		console.log('Change credentials after login!')
		console.log()
		app.get('yamot_save_settings')()
	}

	console.log('Username:', config().username)
	console.log('Password:', config().password)
	console.log("Port:", app.get("port"))
})