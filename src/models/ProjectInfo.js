const _ = require('lodash');
var Projects = require('./Projects.js');

var ProjectInfo = {};

//
// Enhance module
//
ProjectInfo.project = (key => Projects[key]);
ProjectInfo.types = extract('types');
ProjectInfo.skills = extract('skills');

//
// Export the modules
//
module.exports = ProjectInfo;

//
// Private functions
//
function extract(field)
{
	let values = {};
	_.forIn(Projects, function(project, key) {
		_.each(project[field], function(name) {
			values[name] = values[name] || [];
			values[name].push(key);
		});
	});

	let data = [];
	_.forIn(values, function(value, name) {
		data.push({
			name: name,
			count: value.length,
			projects: _.sortBy(_.map(value, key => Projects[key]), ['title'])
		});
	});

	return _.sortBy(data, [x => -x.count, 'name']);
}
