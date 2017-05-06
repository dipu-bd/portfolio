const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		path: path.join(__dirname, '.bin'),
		filename: '[name].min.js'
	},

	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {			
			test: /\.ejs$/,
			loader: "ejs-loader"
		}, {
			test: /\.css$/,
	        //use: [ 'style-loader', 'css-loader' ]
	        use: ExtractTextPlugin.extract({
				use: 'css-loader'
			})
		}]
	},


	plugins: [
		new WebpackCleanupPlugin(),
		new ExtractTextPlugin("[name].css"),
		new HtmlWebpackPlugin({
			template: './src/template.js',
			minify: false //require('html-minifier')
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
			ignore: [ 			
				'.*', // ignore files starting with a dot
			]
		})
	]
};
