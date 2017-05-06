import Website from './models/Website';
import Body from './partials/body';

module.exports = require('./ui/template.ejs')({ 
	Website,
	Body
});
