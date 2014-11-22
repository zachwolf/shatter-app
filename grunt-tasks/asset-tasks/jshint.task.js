var SETTINGS = require("./../settings");

module.exports = function (grunt) {

  grunt.registerTask('jshint:dev', "run jshint on our browser js in dev environment", function () {
    
    // var conf = {};

    // conf = {
    //   task : {
    //     options: SETTINGS.JSHINT_DEV_SETTINGS,
    //     files: {
    //       src: [ SETTINGS.SCRIPT_SOURCE_PATH + '/*.js', SETTINGS.SCRIPT_SOURCE_PATH + '/**/*.js',
    //              "!" + SETTINGS.SCRIPT_SOURCE_PATH + '/lib/*.js',
    //              "!" + SETTINGS.SCRIPT_SOURCE_PATH + '/src/template/*.js',
    //              "!" + SETTINGS.SCRIPT_SOURCE_PATH + '/test/coverage/**/*.js']
    //     }
    //   }
    // };

    // grunt.config('jshint', conf);
    // grunt.task.run("jshint");

  });

  grunt.registerTask('jshint:dist', "run jshint on our browser js in dist environment", function () {
    
    // var conf = {};

    // conf = {
    //   task : {
    //     options: SETTINGS.JSHINT_DEV_SETTINGS,
    //     files: {
    //       src: [ SETTINGS.SCRIPT_SOURCE_PATH + '/*.js', SETTINGS.SCRIPT_SOURCE_PATH + '/**/*.js',
    //              "!" + SETTINGS.SCRIPT_SOURCE_PATH + '/lib/*.js',
    //              "!" + SETTINGS.SCRIPT_SOURCE_PATH + '/test/*.js',
    //              "!" + SETTINGS.SCRIPT_SOURCE_PATH + '/test/coverage/**/*.js']
    //     }
    //   }
    // };

    // grunt.config('jshint', conf);
    // grunt.task.run("jshint");

  });

};