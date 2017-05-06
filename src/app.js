//
// Styles
//
require('bootstrap/dist/css/bootstrap.css');
require('./style.css');

//
// Scripts
//
window._ = require('lodash');
window.$ = window.jQuery = require('jquery');

require('bootstrap');

require('./scripts/onload');

window.models = require('./models/index');
