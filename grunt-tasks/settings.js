var _       = require('underscore')
  , path    = require('path')
  , fs      = require('fs')
  , jshint  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../', '.jshintrc'), {'encoding': 'utf8'}))
  , settings = {}


// Grunt settings
settings.GRUNT_TASKS_PATH  = "./grunt-tasks"


// Localhost settings
settings.SERVER_PORT = 1337 // 2 cool
settings.SERVER_PATH = "./"


// source settings
settings.SOURCE_PATH = "./src"
settings.SCRIPT_SOURCE_PATH = settings.SOURCE_PATH + "/js"


// build settings
settings.BUILD_PATH        = "./build";
settings.SCRIPT_BUILD_PATH = settings.BUILD_PATH + "/js"


// jshint settings
// todo: update globals
settings.JSHINT_BASE_SETTINGS = jshint

settings.JSHINT_DEV_SETTINGS = _.extend({
    "force"   : true,
    "debug"   : true
  }, settings.JSHINT_BASE_SETTINGS)

settings.JSHINT_DIST_SETTINGS = _.extend({
  }, settings.JSHINT_BASE_SETTINGS)


// export settings
module.exports = settings
