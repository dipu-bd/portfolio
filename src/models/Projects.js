const _ = require('lodash');
var Projects = require('../data/Projects.json');

//
// Enhance module
//
mapKeys();

//
// Export the modules
//
module.exports = Projects;

//
// Private functions
//
function mapKeys()
{
	_.forIn(Projects, function(project, key) {
		project.key = key;
	});
}
