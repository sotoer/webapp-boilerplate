'use strict';

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        config: {
            app: 'app',
            dist: 'dist'
        },


        watch: {
            compass: {
                files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/*.html',
                    //'.tmp/styles/{,*/}*.css',
                    '{.tmp,<%= config.app %>}/{scripts,templates}/{,*/}*.{js,tpl}',
                    '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            requirejs: {
                files: ['<%= config.app %>/{scripts,templates}/{,*/}*.{js,tpl}'],
                tasks: ['requirejs']
            }
        },


        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= config.dist %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= config.dist %>'
                    ]
                }
            }
        },

        requirejs: {
            desktop: {
                options: {
                    mainConfigFile: '<%= config.app %>/scripts/main.js',
                    baseUrl: '<%= config.app %>/scripts',
                    name: 'main',
                    include: ['main'],
                    out: '<%= config.dist %>/scripts/main.min.js',
                    preserveLicenseComments: false
                }
            }
        },


        compass: {
            options: {
                sassDir: '<%= config.app %>/styles',
                cssDir: '<%= config.dist %>/styles',
                javascriptsDir: '<%= config.app %>/scripts',
                fontsDir: '<%= config.app %>/styles/fonts',
                importPath: '<%= config.app %>/bower_components'
            },
            dist: {
                options: {

                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        htmlmin: {
            dist: {
                option: {},
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    src: '*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },


        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif,jpg,png}',
                        'styles/fonts/{,*/}*.*',
                        'bower_components/sass-bootstrap/fonts/*.*'
                    ]
                }]
            }
        },

        concurrent: {
            server: [
                'compass',
                //'copy:styles'
            ],
            // test: [
            //     'copy:styles'
            // ],
            dist: [
                //'compass',
                //'copy:styles',
                //'imagemin',
                //'svgmin',
                'htmlmin'
            ]
        }

    });




    grunt.registerTask('server', function (target) {
        console.log('****** ' + target);
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            //'clean:server',
            'concurrent:server',
            //'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });



    grunt.registerTask('build', [
        'requirejs',
        'compass',
        'concurrent:dist',
        'copy:dist'
    ]);

};
