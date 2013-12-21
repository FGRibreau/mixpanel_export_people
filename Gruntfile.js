module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-readme');

  grunt.initConfig({
    pkg: '<json:package.json>',

    min: {
      dist: {
        src: 'index.js',
        dest: 'bookmarklet.js'
      }
    },

    uglify: {
      options:{
        banner:'javascript:',
        mangle: {
          except: ['mp']
        }
      },

      bookmarklet: {
        files: {
          'bookmarklet.js': ['index.js']
        }
      }
    },

    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: false,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'], // '-a' for all files
        createTag: false,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'upstream'
      }
    },

    jshint: {
      options:{
        jshintrc:true
      },
      all: ['Gruntfile.js', 'index.js']
    },

    readme: {
      options: {
        metadata: {
          bookmarklet: function(){
            return require('fs').readFileSync(require('path').resolve(__dirname, 'bookmarklet.js')).toString('utf8');
          }
        }
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'uglify:bookmarklet', 'readme']);
};
