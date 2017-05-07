//
// Styles
//
require('bootstrap-sass/assets/stylesheets/_bootstrap.scss');
require('./styles/main.scss');

//
// Scripts
//
window._ = require('lodash');
window.$ = window.jQuery = require('jquery');

require('bootstrap');

require('./scripts/onload');

window.models = require('./models/index');
