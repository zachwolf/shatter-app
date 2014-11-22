var SETTINGS = require("./settings");

module.exports = function(grunt) {

  grunt.registerTask('todos', "log notes left in our code", function () {
    
    var conf = {};

    conf = {
      task : {
        options: {
          marks: [
            {
              name: "to do:",
              pattern: /todo\:\s/,
              color: "yellow"
            },
            {
              name: "might do:",
              pattern: /todo\?\s/,
              color: "cyan"
            }
          ]
        },
        src: [
          './*',
          SETTINGS.GRUNT_TASKS_PATH + '/**/*',
          SETTINGS.SERVER_PATH + '/**/*'
        ]
      }
    };

    grunt.config('todo', conf);
    grunt.task.run("todo");

  });

};