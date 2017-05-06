const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	context: __dirname,
	entry: {
		app: './src/app.js'
	},
	output: {
		path: path.join(__dirname, '.bin'),
		filename: '[name].min.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {			
			test: /\.ejs$/,
			loader: "ejs-loader"
		}, {
			test: /\.json$/,
			use: 'json-loader'
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
			  fallback: 'style-loader',
			  //resolve-url-loader may be chained before sass-loader if necessary
			  use: ['css-loader', 'sass-loader']
			})
		}]
	},
	plugins: [
		new WebpackCleanupPlugin(),
		new ExtractTextPlugin("style.css"),
		new HtmlWebpackPlugin({
			template: './src/template.js',
			minify: require('html-minifier'),
			chunks: {
				css: [ 'style.css' ]
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
			output: {
				comments: false,
			},
		}),
		new CopyWebpackPlugin([{
			from: path.join(__dirname, 'static'),
			to: 'static'
		}], {
			ignore: [ '.*' ]
		})
	]
};
