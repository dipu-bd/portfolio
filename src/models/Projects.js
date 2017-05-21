const _ = require('lodash');
var Projects = require('../data/Projects.json');

//
// Enhance module
//
_.each(_.keys(Projects), function(key) {
	Projects[key].key = key;
});

//
// Export the modules
//
module.exports = Projects;

//
// Private functions
//
