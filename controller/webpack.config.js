var path = require("path");

module.exports = {
	context: path.join(__dirname, "dist"),

	mode: 'production',

	entry: {
		"bundle": "./main.js",
	},

	target: "node",

	output: {
		path:     path.join(__dirname, "dist"),
		filename: "[name].js"
	},

	resolve: {
		extensions: ['.js']
	}
};
