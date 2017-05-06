const _ = require('lodash');
var Personal = require('../data/Personal.json');

//
// Enhance module
//
Personal._about = Personal.about;
Personal.about = function(tag) {
	tag = tag || 'p';
	const start = '\n<' + tag + '>';
	const close = '</' + tag + '>\n';
	return start + _.join(this._about, close + start) + close;
};

//
// Export the modules
//
module.exports = Personal;


//
// Private functions
//
