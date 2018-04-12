import { app } from "../main"
import { ConfigModel, SettingsModel, ServerModel } from "./model";

export const CONF_FILE: string = 'yamot_config.json'

export function default_config(): ConfigModel {
	return Object.assign({}, {
		username: 'yamot',
		password: rand_text(),
		server: [],
		settings: new SettingsModel()
	})
}

export function rand_text(len = 6): string {
	let text: string = ""
	let possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

	for (let i = 0; i < len; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length))

	return text
}

export function config(): ConfigModel {
	return app.get('yamot_config') as ConfigModel
}