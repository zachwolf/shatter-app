// task settings
var SETTINGS = require( "./grunt-tasks/settings" );

module.exports = function(grunt) {

  // load all required grunt tasks dependencies
  require('load-grunt-tasks')(grunt);

  // alias watch task to allow for prompt
  grunt.task.renameTask("watch", "_watch");

  // load tasks from the grunt tasks dir
  grunt.task.loadTasks(SETTINGS.GRUNT_TASKS_PATH);
  grunt.task.loadTasks(SETTINGS.GRUNT_TASKS_PATH + '/asset-tasks');

};
