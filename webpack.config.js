const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
	 entry: './src/app.js',
	 output: {
		path: path.join(__dirname, '.bin'),
		filename: 'app.min.js'
	 },
	 module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {			
    		test: /\.ejs$/,
    		loader: "ejs-loader"
		}]
	},
	plugins: [
		new WebpackCleanupPlugin(),
		new HtmlWebpackPlugin({
    		template: './src/template.js',
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
			from: path.join(__dirname, 'public'),
			to: 'public'
		}], {
            ignore: [ '.*' ]
        }),
	]
};