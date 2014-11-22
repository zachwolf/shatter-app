var SETTINGS = require("./settings"),
    spawn    = require('child_process').spawn;

module.exports = function (grunt) {

  /*grunt.registerTask('concurrent:all', 'run and watch our server and our assets at the same time', function () {
    var conf = {};

    // enable input while task is watching
    // todo: this currently seems to break the watch task. Fix that.
    // error Fatal error: read EIO
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (data) {

      data = (data + '').trim().toLowerCase();
   
      // log todos
      if (data === "todos") {
        spawn('grunt', ['todos'], { stdio: 'inherit'});
      }
   
      // reset built asset files
      if (data === "reset_build") {
        spawn('grunt', ['reset_build'], { stdio: 'inherit'});
      }
    });

    // configure concurrent tasks
    conf = {
      task: ['startServer', 'watch:assets'],
      options: {
        logConcurrentOutput: true
      }
    };

    grunt.config("concurrent", conf);
    grunt.task.run('concurrent');
  });*/

};