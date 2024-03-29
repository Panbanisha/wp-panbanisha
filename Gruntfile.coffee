module.exports = (grunt) ->

  grunt.initConfig

    sass:
      all:
        expand: true
        flatten: true
        src: ['src/**/*.scss']
        dest: 'dist/assets'
        ext: '.css'
      options:
        sourcemap: 'none'

    autoprefixer:
      all:
        expand: true
        flatten: true
        src: ['dist/assets/*.css']
        dest: 'dist/assets'
        ext: '.css'

    cssmin:
      options:
        report: 'gzip'
      dist:
        files:
          'dist/assets/main.css': 'dist/assets/main.css'

    watchify:
      options:
        detectGlobals: true,
        insertGlobals: false,
        ignoreMissing: false,
        debug: false,
        standalone: false,
        keepalive: false,
      dev:
        src: './src/**/*.jsx',
        dest: './dist/assets/bundle.js'

    browserify:
      dev:
        files:
          'dist/assets/bundle.js': 'src/main.jsx'
        options:
          browserifyOptions:
            debug: true
            extensions: ['.jsx', '.coffee']
      dist:
        files:
          'dist/assets/bundle.js': 'src/main.jsx'
        options:
          browserifyOptions:
            debug: false
            extensions: ['.jsx', '.coffee']
            fullPaths: false
      options:
        watch: true
        transform: [
          'coffeeify'
          ['reactify', {'es6': true}]
        ]

    uglify:
      'dist/assets/bundle.js': 'dist/assets/bundle.js'
      options:
        report: 'gzip'

    watch:
      sass:
        files: ['src/**/*.scss']
        tasks: ['sass', 'autoprefixer']
      browserify:
        files: ['src/**/*.jsx']
        tasks: 'browserify:dev'
      dist:
        files: ['dist/**/*']
        options:
          livereload: true

    rsync:
      options:
        ssh: true
        args: ['--stats']
        exclude: ['.*']
        recursive: true
        delete: true
      theme:
        options:
          src: './dist/theme'
          dest: './wordpress/wp-content/themes/panbanisha'
      assets:
        options:
          src: './dist/assets'
          dest: './wordpress'
      # assetsToProduction:
      #   options:
      #     src: './dist/assets'
      #     dest: '/var/www/ange/wordpress'
      #     host: 'ryo@160.16.61.21'
      #     port: '4215'

    express:
      server:
        options:
          server: 'server.coffee'
          bases: 'dist'
          hostname: '*'
          port: 8000
          #serverreload: true

  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-autoprefixer')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-rsync')
  grunt.loadNpmTasks('grunt-express')
  grunt.registerTask('default', ['express', 'sass', 'autoprefixer', 'browserify:dev', 'watch'])
  grunt.registerTask('build', ['sass', 'autoprefixer', 'cssmin', 'browserify:dist', 'uglify'])
  grunt.registerTask('deploy', ['build', 'rsync'])
  grunt.registerTask('upToVM', ['build', 'rsync:assets', 'rsync:theme'])
