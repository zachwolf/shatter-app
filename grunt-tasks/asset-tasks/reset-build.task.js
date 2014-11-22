var SETTINGS = require("./../settings");

module.exports = function (grunt) {

  grunt.registerTask('reset_build', 'clean and git checkout our build directory', function () {
    var conf = {};

    conf = {
      task: {
        options: {
          path: SETTINGS.BUILD_PATH
        }
      }
    };

    grunt.config('git_reset', conf);
    grunt.task.run('clean:build');
    grunt.task.run('git_reset');

  });

};