var SETTINGS    = require("./../settings")
  , getFileTree = require('./../helpers').getFileTree;

module.exports = function (grunt) {

  // alias task name
  grunt.task.renameTask("uglify", "_uglify");

  grunt.registerTask('uglify', "minify JS", function () {
    
    var conf = {
      task: {
        options: {
          report: "min" // "gzip" // gzip kills task speed
        },
        files: {}
      }
    },
    dest, src;

    getFileTree( SETTINGS.SCRIPT_SOURCE_PATH + '/lib' )
      .forEach(function(file){
        dest = SETTINGS.SCRIPT_BUILD_PATH + '/lib/' + file;
        src  = SETTINGS.SCRIPT_SOURCE_PATH + '/lib/' + file;
        conf.task.files[ dest ] = src;
      });

    // example file
    // conf.task.files[ SETTINGS.SCRIPT_BUILD_PATH + "/src/b.min.js" ] = SETTINGS.SCRIPT_BUILD_PATH + "/src/b.js";

    grunt.config('_uglify', conf);
    grunt.task.run("_uglify");

  });

};