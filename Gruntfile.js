module.exports = function(grunt) {

    grunt.initConfig({
        uncss: {
            dist: {
                files: [{
                    src: 'src/index.html',
                    dest: 'dist/public_html/css/tidy.css'
                }]
            }
        },
        cssmin: {
            dist: {
                files: [{
                    src: 'dist/public_html/css/tidy.css',
                    dest: 'dist/public_html/css/tidy.min.css'
                }]
            }
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: ['src/js/*.js'],
                // the location of the resulting JS file
                dest: 'dist/public_html/js/aggregated.js'
            }
        },
        uglify: {
            options: {
                //banner: '/*! aggregated <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/public_html/js/aggregated.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    'dist/public_html/index.html': ['src/index.html']
                }
            }
        },
        cacheBust: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 16,
                rename: false
            },
            assets: {
                files: [{
                    src: ['dist/public_html/index.html']
                }]
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        src: ['src/*'],
                        dest: 'dist/public_html',
                        filter: 'isFile',
                        flatten: true
                    },

                    // includes files within path and its sub-directories
                    {
                        expand: true,
                        src: ['src/fonts/*'],
                        dest: 'dist/public_html/fonts',
                        filter: 'isFile',
                        flatten: true
                    }
                ]
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-cache-bust');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default tasks.
    grunt.registerTask('default', ['copy', 'uncss', 'cssmin', 'concat', 'uglify', 'processhtml', 'cacheBust']);

};