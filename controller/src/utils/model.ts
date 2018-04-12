export class ServerModel {
	alias: string
	addr: string
	port: number
	user: string
	pw: string

	description?: string = ''
	powerSupply?: number = 0
	averageCurrent?: number = 0
}

export class SettingsModel {
	sizeFactor: 1000 | 1024 = 1024
	speedFactor: 8 | 1 = 8
	windowUpdates: 'always' | 'active' = 'active'
	updateInterval: number = 3
	kWhPrice: number = 0
}

export class ConfigModel {
	username: string
	password: string
	server: ServerModel[]
	settings: SettingsModel
}
