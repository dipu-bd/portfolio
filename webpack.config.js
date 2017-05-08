const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');
//const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const development = (process.env.NODE_ENV !== 'production');

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		path: path.join(__dirname, ['dist', '.bin'][development ? 1 : 0]),
		filename: '[name].min.js'
	},
	devServer: {
		//contentBase: '.bin', // contents not from webpack is served from here
		inline: true, // output is serve from /
		port: 8000,
		open: true
	},

	module: {		
		loaders: [
			// babel-loader compiles js files using ecmascipt6 engine.
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			// compiles ejs files into html. 
			// ejs-loader can be used as alternative.
            { 
            	test: /\.(html|ejs)$/,
            	loader: "underscore-template-loader"
        	},
        	// use file-loader to load assets. require() will return a filename
            {
            	test: /\.(jpg|png|bmp)$/, 
            	loader: "file-loader" 
            },
            // replace path mentioned inside url() function
			// url-loader uses file-loader
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
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
	},
	plugins: [
		//new WebpackCleanupPlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new OptimizeCssAssetsPlugin(),
		new ExtractTextPlugin({
			filename: "[name].min.css",
		}),
		new HtmlWebpackPlugin({
			template: './src/index.ejs',
			minify: (!development) && {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true
			}
		}),
		/*
		new CopyWebpackPlugin([{
			from: path.join(__dirname, 'static'),
			to: 'static'
		}], {
			ignore: [ 			
				'.*', // ignore files starting with a dot
			],
			copyUnmodified: false
		}),
		*/
	].filter(function(plugin) {
		const disabled = development ? [
			'UglifyJsPlugin',
			'OptimizeCssAssetsPlugin',
		] : [
			'WebpackCleanupPlugin',
		];		
		const canuse = disabled.indexOf(plugin.constructor.name) < 0;
		canuse && console.log(">> plugin: " + plugin.constructor.name);		
		return canuse;
	})
}

