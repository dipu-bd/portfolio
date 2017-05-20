const _ = require('lodash');
var Projects = require('./Projects.js');

var ProjectInfo = {};

//
// Enhance module
//
ProjectInfo.project = getProject;
ProjectInfo.types = extractTypes();
ProjectInfo.sortedTypes = sortedTypes();

//
// Export the modules
//
module.exports = ProjectInfo;

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

function getProject(key) {
	return Projects[key];
}
