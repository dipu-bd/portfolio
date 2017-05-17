const _ = require('lodash');
var Projects = require('../data/Projects.json');

//
// Enhance module
//
Projects.types = extractTypes();
Projects.sortedTypes = sortedTypes();

//
// Export the modules
//
module.exports = Projects;

//
// Private functions
//
function extractTypes()
{
	let types = {};
	_.forIn(Projects, function(project, key) {
		_.each(project.types, function(type) {
			types[type] = types[type] || [];
			types[type].push(key);
		});
	});
	return types;
}

function sortedTypes() {
	let types = extractTypes();
	return _.sortBy(_.keys(types), k => -(types[k].length));
}