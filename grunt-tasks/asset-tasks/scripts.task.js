var SETTINGS    = require("./../settings")
  , getFileTree = require('./../helpers').getFileTree
  , remapify    = require('remapify')
  , browserify  = require('browserify')
  , path        = require('path')
  ;


module.exports = function (grunt) {

  // alias task name
  grunt.task.renameTask("browserify", "_browserify");

  grunt.registerTask('browserify', "compile JS", function () {
    
    var conf = {
      userScripts: {
        config: {
          options: {
            preBundleCB: function(b) {
              /*
              b.on('remapify:files', function(file, expandedAliases, globber, pattern){
                console.log("expandedAliases", expandedAliases);
              });
              */

              b.plugin(remapify, [
                // remap require('./foo') -> require('src/foo')
                {
                  src: './**/*.js'
                  , cwd: SETTINGS.SCRIPT_SOURCE_PATH
                  , filter: function(alias, dirname, basename) {
                    return path.join(dirname, basename.replace(/^\_(.*)\.js$/, '$1'));
                  }
                }
              ]);
            }
          },
          files: {}
        }
      }
    };

    getFileTree( SETTINGS.SCRIPT_SOURCE_PATH )
      .forEach(function(file){
        var src  = path.join(SETTINGS.SCRIPT_SOURCE_PATH, file)
          , dest = path.join(SETTINGS.SCRIPT_BUILD_PATH, file)

        conf.userScripts.config.files[dest] = src;
      });

    grunt.config('_browserify', conf.userScripts);
    grunt.task.run('_browserify');

  });

};