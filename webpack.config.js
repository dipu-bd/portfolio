const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const OUTPUT_PATH = path.join(__dirname, 'bin');

module.exports = {
	 entry: path.join(__dirname, 'src/index.js'),
	 output: {
		path: OUTPUT_PATH,
		filename: 'index.min.js',
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
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: true,
			},
			output: {
				comments: false,
			},
		}),
		new HtmlWebpackPlugin({
			title: 'Sudipto Chandra - Portfolio',
			//favicon: '',
    		template: path.join(__dirname, 'src/index.ejs'),
    	}),
		new CopyWebpackPlugin([{
			from: path.join(__dirname, 'public'),
			to: path.join(OUTPUT_PATH, 'public')
		}], {
            ignore: [ '.*' ]
        }),
	]
};