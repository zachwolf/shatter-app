var SETTINGS = require("./../settings");

module.exports = function (grunt) {

  grunt.registerTask('clean:build', "clear out entire build directory", function () {
    
    var conf = {};

    conf = {
      task : [ SETTINGS.BUILD_PATH ]
    };

    grunt.config('clean', conf);
    grunt.task.run("clean");

  });

  grunt.registerTask('clean:scripts', "clear out build script directory", function () {
    
    var conf = {};

    conf = {
      task : [ SETTINGS.SCRIPT_BUILD_PATH ]
    };

    grunt.config('clean', conf);
    grunt.task.run("clean");

  });

};