const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
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
			test: /\.css$/,
			//use: [ 'style-loader', 'css-loader' ]
			use: ExtractTextPlugin.extract({
				use: 'css-loader'
			})
		}, { 
			test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/, 
			loader: 'url-loader?limit=100000' 
		}]
	},


	plugins: [
		new WebpackCleanupPlugin(),
		new OptimizeCssAssetsPlugin(),
		new ExtractTextPlugin("[name].min.css"),
		new HtmlWebpackPlugin({
			template: './src/template.js',
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true
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
			ignore: [ 			
				'.*', // ignore files starting with a dot
			]
		})
	]
};
