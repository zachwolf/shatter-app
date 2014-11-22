var SETTINGS = require("./settings");

module.exports = function(grunt) {

  grunt.registerTask('watch', 'run and watch our server and our assets at the same time', function () {
    var conf = {};

    // configure concurrent tasks
    conf = {
      task: ['startServer', 'watch:assets', 'open'],
      options: {
        logConcurrentOutput: true
      }
    };

    grunt.config("concurrent", conf);
    grunt.task.run('concurrent');
  });
};