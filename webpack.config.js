const webpack = require('webpack');

module.exports = {
	 entry: __dirname + '/src/app.js',
	 output: {
	    path: __dirname + '/bin',
	    filename: 'app.min.js'
	 },
	 module: {
	    loaders: [{
	        test: /\.js$/,
	        exclude: /node_modules/,
	        loader: 'babel-loader'
	    }]
	},
	plugins: [
	    new webpack.optimize.UglifyJsPlugin({
	        compress: {
	            warnings: true,
	        },
	        output: {
	            comments: false,
	        },
	    }),
	]
};