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

    minify: {
      dynamic_mappings: {
        // Grunt will search for "**/*.js" under "lib/" when the "minify" task
        // runs and build the appropriate src-dest file mappings then, so you
        // don't need to update the Gruntfile when files are added or removed.
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            cwd: 'src/libs/',      // Src matches are relative to this path.
            src: ['**/*.js'], // Actual pattern(s) to match.
            dest: 'build/',   // Destination path prefix.
            ext: '.min.js',   // Dest filepaths will have this extension.
          },
        ],
      },
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

  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  // Default task(s).
  grunt.registerTask('build', ['concat', 'cssmin', 'uglify', 'sass']);

};
