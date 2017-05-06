window._ = require('lodash');
window.$ = window.jQuery = require('jquery');

require('bootstrap-sass');
require('bootstrap');

require('./scripts/onload');

window.models = require('./models/index');
