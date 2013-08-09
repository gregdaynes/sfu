module.exports = function(grunt) {
  
  // load the plugins that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  
  // initial task(s)
  grunt.registerTask('default', [
    'shell:jekyll__dev',
    'shell:jekyll__live',
    'build-css',    
    'watch'
  ]);
  
  // sass changes
  grunt.registerTask('build-css', [
    'sass:dev',
    'autoprefixer',
    'copy:css',
    'cssmin',
  ]);
  
  // js changes
  grunt.registerTask('build-js', [
    'uglify',
    'copy:js',
  ]);
  
  
  // project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    /**
     * Watch
     * watch for changes inside project
     */
    watch: {
      
      sass: {
        files: ['assets/css/**/*.scss'],
        tasks: 'build-css',
      }, 
      
      livereload: {
        options: {
          livereload: true
        },
        files: ['__dev/assets/css/**/*.*'],
      },
      
      javascript: {
        files: ['assets/js/*.js'],
        tasks: 'build-js'
      },
      
      jekyll: {
        files: [
          '*.html', 
          '*.yml', 
          '_posts/**', 
          '_includes/**',
          '_layouts/**',
          '*.md',
        ],
        tasks: [
          'shell:jekyll__dev',
          'shell:jekyll__live',
          'htmlmin:live',
        ]
      }
    },
    
    shell: {
      jekyll__dev: {
        command: 'rm -rf __dev/*; jekyll build --d __dev',
        stdout: true
      },
      
      jekyll__live: {
        command: 'rm -rf __live; cp -R __dev __live',
        stdout: true
      },
    },
    
    uglify: {
      live: {
        expand: true,
        cwd: 'assets/js/',
        src: '**/*.js',
        dest: '__live/assets/js/',
        ext: '.js', 
      }
    },
    
    sass: {
      dev: {
        files: {
          'assets/css/style.css': 'assets/css/style.scss'
        }
      }
    },
    
    autoprefixer: {
      dev: {
        files: {
          'assets/css/style.css': 'assets/css/style.css'
        }
      }
      
    },
    
    cssmin: {
      minify: {
        files: {
          '__live/assets/css/style.css': 'assets/css/style.css' 
        }
      }
    },

    copy: {
      css: {
        files: {
           '__dev/assets/css/style.css':'assets/css/style.css',
        }
      },
      
      js: {
          expand: true,
          cwd: 'assets/js/',
          src: '**/*.js',
          dest: '__dev/assets/js/',
          ext: '.js'
      },
    }, 
    
    htmlmin: {                                     // Task
      live: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: [
          {                                   // Dictionary of files
            expand: true,
            cwd: '__live/',
            src: '**/*.html',
            dest: '__live/',
          }
        ],
      },
    },
    
  });
}