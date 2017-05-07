const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var release = (process.env.NODE_ENV === 'production');

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		path: path.join(__dirname, release ? 'dist' : '.bin'),
		filename: '[name].min.js'
	},

	module: {		
		loaders: [
			// babel-loader compiles js files using ecmascipt6 engine.
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}, 
			// compiles ejs files into html
			{			
				test: /\.ejs$/,
				loader: "ejs-loader"
			}, 
			// copy all static resources into single svg file
			// note: url-loader useds file-loader
			{ 
				test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/, 
				loader: 'url-loader?limit=100000' 
			}, 
			// compiles scss files using sass-loader
			{
				test: /\.(css|scss)$/,
				use: ExtractTextPlugin.extract({
					use: [{
						loader: "css-loader"
					}, {
						loader: "sass-loader"
					}],
					// use style-loader in development
					fallback: "style-loader"
				})
			}
		]
	}
};

var plugins = [
	//new WebpackCleanupPlugin(),	
	new ExtractTextPlugin({
		filename: "[name].min.css",
		//disable: !release // extract only in production
	}),
	new CopyWebpackPlugin([{
		from: path.join(__dirname, 'static'),
		to: 'static'
	}], {
		ignore: [ 			
			'.*', // ignore files starting with a dot
		],
		copyUnmodified: false
	}),
	new HtmlWebpackPlugin({
		template: './src/index.ejs',
		minify: release && {
			collapseWhitespace: true,
			removeComments: true,
			removeRedundantAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true
		}
	}),	
];

// plugins to load only for release profile
if(release) {
	plugins = _.concat(plugins, [
		new OptimizeCssAssetsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: true,
			},
			output: {
				comments: false,
			},
		}),
	])
}

module.exports.plugins = plugins;
