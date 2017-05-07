//
// Styles
//
require('bootstrap-sass/assets/stylesheets/_bootstrap.scss');
require('font-awesome/scss/font-awesome.scss')
require('./app.scss');

//
// Scripts
//
window._ = require('lodash');
window.$ = window.jQuery = require('jquery');

require('bootstrap-sass');

require('./scripts/onload');

window.models = require('./models/index');
