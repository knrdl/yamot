import { Request, Response, NextFunction } from "express"

//fixme: token based auth (jwt) is a better choice for the future

export var authFn = (req: Request, res: Response, next: NextFunction) => {
	let auth = req.headers.authorization

	if (auth && typeof auth === 'string' && auth.length > 6 && auth.startsWith('Basic ')) {
		let authdata: string = null
		try {
			authdata = Buffer.from(auth.substr(6), 'base64').toString('binary')
		} catch (e) {
			res.status(400).send()
		}

		if (authdata !== null && typeof authdata === 'string' && authdata.length > 2 && authdata.includes(':')) {
			next()
		} else {
			res.status(400).send()
		}
	} else {
		res.statusCode = 401
		res.setHeader('WWW-Authenticate', 'Basic realm="Yamot"')
		res.end('Please log in')
	}
}
