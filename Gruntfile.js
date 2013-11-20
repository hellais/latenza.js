module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    clean: {
      release: ['tmp']
    },

    copy: {
        release: {
            files: [{
                dest: 'tmp/', cwd: 'src/', src: ['**'], expand: true
            }]
        }
    },

    // usemin handler should point to the file containing
    // the usemin blocks to be parsed
    'useminPrepare': {
      html: 'tmp/index.html'
    },

    // update references in HTML/CSS to revved files
    usemin: {
      html: [
             'tmp/index.html',
            ],
      css: [
        'tmp/**/**.css',
      ],
      options: {
        dirs: ['tmp']
      }
    },

    // HTML minification
    html: {
      files: ['**/*.html']
    },

    pkg: grunt.file.readJSON('package.json'),

    reload: {
        port: 6001,
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'tmp/js/*.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
  });

  grunt.registerTask('cleanupWorkingDirectory', function() {

    grunt.file.mkdir('build');
    grunt.file.mkdir('build/img');
    grunt.file.mkdir('build/fonts');

    grunt.file.copy('tmp/styles.css', 'build/styles.css');
    grunt.file.copy('tmp/scripts.js', 'build/scripts.js');
    grunt.file.copy('tmp/index.html', 'build/index.html');

    grunt.file.recurse('tmp/img', function(absdir, rootdir, subdir, filename) {
        grunt.file.copy(absdir, path.join('build/img', subdir || '', filename || ''));
    });

    grunt.file.recurse('tmp/fonts', function(absdir, rootdir, subdir, filename) {
        grunt.file.copy(absdir, path.join('build/fonts', subdir || '', filename || ''));
    });

  });

  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  // Default task(s).
  grunt.registerTask('build', ['copy', 'useminPrepare', 'concat', 'cssmin',
                     'uglify', 'usemin', 'cleanupWorkingDirectory']);

};
