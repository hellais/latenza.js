module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: [
        'src/*.html',
        'src/src/**/*.scss',
        'src/src/**/*.css',
        'src/js/**/*.js',
        'src/templates/**/*.html',
        'src/img/**/*',
        'src/fonts/*',
      ],
      tasks: ['build', 'reload', 'connect']
    },
    
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'src',
          keepalive: true
        }
      }
    },

    reload: {
        port: 6001,
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/js/*.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'src/css/main.css': 'src/scss/main.scss',       // 'destination': 'source'
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  
  // Default task(s).
  grunt.registerTask('build', ['uglify', 'sass']);

};
