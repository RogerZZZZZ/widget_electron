var path = require('path');
var webpack = require('webpack');

module.exports = {
	cache: true,
	target: 'electron',
	entry: {
		app: './app/app.jsx',
		setting: './app/setting.jsx'
	},
	output: {
		path: path.resolve(__dirname, 'out'),
		publicPath: 'out/',
		filename: '[name].js',
		chunkFilename: '[chunkhash].js',
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ['babel-loader']
			}, {
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}, {
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			}, {
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/font-woff'
			}, {
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/font-woff'
			}, {
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/octet-stream'
			}, {
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file'
			}, {
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=image/svg+xml'
			}, {
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	}
};
