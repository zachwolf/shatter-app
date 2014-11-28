var SETTINGS = require("./../settings");

module.exports = function (grunt) {

  grunt.registerTask('build:dev', "build unminified versions of assets", function () {
    console.log("-------------------------------------------------");
    console.log("build:dev called");
    console.log("-------------------------------------------------");
    
    // script tasks
    // grunt.task.run('jshint:dev');
    grunt.task.run('uglify');
    grunt.task.run('browserify');

    // copy assets
    // grunt.task.run('copy');

    // notes
    grunt.task.run('todos');
  });

  /*grunt.registerTask('build:dist', "build minified assests for production", function () {
    console.log("-------------------------------------------------");
    console.log("build:dist called");
    console.log("-------------------------------------------------");
    // style tasks
    grunt.task.run('clean:styles');
    grunt.task.run('compass:dist');
    
    // script tasks
    grunt.task.run('clean:scripts');
    grunt.task.run('jshint:dist');
    grunt.task.run('uglify'); // todo: set up a dist for this 
    grunt.task.run('browserify');
    grunt.task.run('compileHTML');

    // notes
    grunt.task.run('todos');
  });*/

};