var loaders = [
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
	// compiles sass files using sass-loader
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
];

var env = process.env.NODE_ENV;
module.exports = loaders.filter(function(loader) {
	return true;
});