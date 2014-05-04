module.exports = function(grunt) {

    "use strict";

    grunt.initConfig({

        pkg : grunt.file.readJSON('package.json'),

        banner: '/*!\n' +
            ' * <%%= pkg.name %> - <%%= grunt.template.today("yyyy") %> \n' +
            ' * Version <%%= pkg.version %>\n' +
            ' */\n',

        clean: {
            js: [
                'Public/JS/<%= _.slugify(websiteName) %>.js',<% if (includeModernizr) { %>
                'Public/JS/modernizr.js'<% } %>
            ],
            css: [
                'Public/CSS/<%= _.slugify(websiteName) %>.css'
            ],
            docu: [
                'Documentation/jsdoc/*'
            ]
        },

        compress: {
            website: {
                options: {
                    archive: '../<%%= grunt.template.today("yyyymmdd_HHss") %>_<%%= pkg.name %>.zip'
                },
                files: [
                    {
                        src: ['Public/**'],
                        dest: '/'
                    }
                ]
            },
            docu: {
                options: {
                    archive: '../<%%= grunt.template.today("yyyymmdd") %>_<%%= pkg.name %>_Documentation.zip'
                },
                files: [
                    {
                        src: ['Documentation/**'],
                        dest: '/'
                    }
                ]
            },
            scripts: {
                options: {
                    mode: 'gzip'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'Public/JS/',
                        src: ['*.js'],
                        dest: 'Public/JS/',
                        ext: '.gz.js'
                    },{
                        expand: true,
                        cwd: 'Public/CSS/',
                        src: ['*.css'],
                        dest: 'Public/CSS/',
                        ext: '.gz.css'
                    }
                ]
            }
        },

        concat : {
            options: {
                banner: '<%%= banner %>',
                stripBanners: false
            },
            main : {
                src : [<% if (includeJquery) { %>
                    'bower_components/jquery/jquery.js',
                    'bower_components/jQueryui/ui/jquery-ui.js',
                    'bower_components/jqueryui-touch-punch/jquery.ui.touch-punch.js ',
                    'bower_components/jquery-backstretch/jquery.backstretch.js',
                    'bower_components/FitText.js/jquery.fittext.js',
                    'bower_components/jquery-waypoints/waypoints.js',
                    'bower_components/Buttons/js/buttons.js',
                    'bower_components/Detection.js/Detection.js',
                    'bower_components/masonry/dist/masonry.pkgd.js',
                    'bower_components/imagesloaded/imagesloaded.pkgd.js',<% } if (includePolyfill) { %>
                    'bower_components/respond/dest/respond.src.js',<% } if (includeCreate) { %>
                    'bower_components/easeljs/lib/easeljs-0.7.1.combined.js',
                    'bower_components/createjs-tweenjs/lib/tweenjs-0.5.1.combined.js',
                    'bower_components/createjs-preloadjs/lib/preloadjs-0.4.1.combined.js',
                    'bower_components/createjs-soundjs/lib/soundjs-0.5.2.combined.js',
                    'JavaScript/Canvas.js',<% } %>
                    'JavaScript/Main/Main.js',
                    'JavaScript/Main/MainTools.js'
                ],
                dest : 'Public/JS/<%= _.slugify(websiteName) %>.js'
            }
        },

        copy : {
            dev : {
                files : [
                    {
                        expand: true,
                        cwd: 'bower_components/modernizr/modernizr.js',
                        src : 'modernizr.js',
                        dest : 'Public/JS/'
                    }
                ]
            },
            dist : {
                files : [
                    <% if (includePolyfill) { %>
                    {
                        expand: true,
                        cwd: 'bower_components/selectivizr/',
                        src : 'selectivizr.js',
                        dest : 'Public/JS/'
                    },{
                        expand: true,
                        cwd: 'bower_components/css3pie/',
                        src : 'PIE.js',
                        dest : 'Public/JS/'
                    },{
                        expand: true,
                        cwd: 'bower_components/css3pie/',
                        src : 'PIE.htc',
                        dest : 'Public/JS/'
                    },{
                        expand: true,
                        cwd: 'bower_components/background-size-polyfill/',
                        src : 'backgroundsize.min.htc',
                        dest : 'Public/JS/'
                    },{
                        expand: true,
                        cwd: 'bower_components/box-sizing-polyfill/',
                        src : 'boxsizing.htc',
                        dest : 'Public/JS/'
                    },
                    <% } %>
                    {
                        expand: true,
                        cwd: 'bower_components/modernizr/',
                        src : 'modernizr.js',
                        dest : 'Public/JS/'
                    },{
                        expand: true,
                        cwd: 'bower_components/font-awesome/fonts/',
                        src : '*',
                        dest : 'Public/Fonts/'
                    }

                ]
            }
        },

        devUpdate: {
            show: {
                options: {
                    updateType: 'report',
                    reportUpdated: true,
                    packages: {
                        devDependencies: true,
                        dependencies: true
                    },
                    packageJson: null
                }
            },
            install: {
                options: {
                    updateType: 'force',
                    reportUpdated: false,
                    semver: false,
                    packages: {
                        devDependencies: true,
                        dependencies: false
                    },
                    packageJson: null
                }
            }
        },

        jsdoc : {
            dist : {
                src: [
                    'JavaScript/Main/*.js'
                ],
                options: {
                    destination: 'Documentation/jsdoc'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: 'JavaScript/.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: [
                    'JavaScript/Main/Main.js',
                    'JavaScript/Main/MainTools.js'
                ]
            }
        },

        less: {
            options: {
                compress: false,
                clancss: false,
                strictMath: true,
                ieCompat: true
            },
            main: {
                files: {
                    'Public/CSS/<%= _.slugify(websiteName) %>.css': 'Less/Styles/PageStyle.less'
                }
            }
        },

        markdown: {
            all: {
                options: {
                    markdownOptions: {
                        gfm: true
                    }
                },
                files: [
                    {
                        src: 'README.md',
                        dest: 'Documentation/ProjectReadMe.html'
                    }
                ]
            }
        },

        notify: {
            less: {
                options: {
                    title: '<%%= pkg.name %>',
                    message: 'CSS ready'
                }
            },
            js: {
                options: {
                    title: '<%%= pkg.name %>',
                    message: 'JavaScript ready'
                }
            },
            dev: {
                options: {
                    title: '<%%= pkg.name %>',
                    message: 'Grunt has create development environment'
                }
            },
            all: {
                options: {
                    title: '<%%= pkg.name %>',
                    message: 'Grunt build all for a Release'
                }
            }
        },
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                title: '<%%= pkg.name %>'
            }
        },

        recess: {
            options: {
                compile: false,
                compress: true,
                banner: '<%%= banner %>'
            },
            main: {
                src: [
                    'Public/CSS/<%= _.slugify(websiteName) %>.css'
                ],
                dest: 'Public/CSS/<%= _.slugify(websiteName) %>.min.css'
            }
        },

        replace: {
            dev: {
                src: [
                    'Public/index.html'
                ],
                overwrite: true,
                replacements: [
                    {
                        from: /<link[^>]*min[.]css"*(( )?[a-zA-Z="]*)?>/g,
                        to: function (MatchedWord) {
                            return MatchedWord.replace('.min.css', '.css');
                        }
                    }, {
                        from: /<script[^>]*min[.]js">/g,
                        to: function (MatchedWord) {
                            return MatchedWord.replace('.min.js', '.js');
                        }
                    }
                ]
            },
            build: {
                src: [
                    'Public/index.html'
                ],
                overwrite: true,
                replacements: [
                    {
                        from: /<link[^>]*([a-zA-Z0-9\-._]?\w+(?!.min)\w)([a-zA-Z0-9\-_]*\w+(?!.min)\w)(.css)"*(( )?[a-zA-Z="]*)?>/g,
                        to: function (MatchedWord) {
                            return MatchedWord.replace('.css', '.min.css');
                        }
                    }, {
                        from: /<script[^>]*([a-zA-Z0-9\-._]?\w+(?!.min)\w)([a-zA-Z0-9\-_]*\w+(?!.min)\w)(.js)">/g,
                        to: function (MatchedWord) {
                            return MatchedWord.replace('.js', '.min.js');
                        }
                    }
                ]
            }
        },

        uglify : {
            options : {
                banner : '<%%= banner %>',
                report : 'min'
            },<% if (includeModernizr) { %>
            Modernizr : {
                src : 'bower_components/modernizr/modernizr.js',
                dest : 'Public/JS/modernizr.min.js'
            },<% } %>
            main : {
                src : 'Public/JS/<%= _.slugify(websiteName) %>.js',
                dest : 'Public/JS/<%= _.slugify(websiteName) %>.min.js'
            }
        },

        watch : {
            options: {
                livereload: true,
                interval: 1223
            },

            src: {
                files: '<%%= jshint.src.src %>',
                tasks: ['jshint:src', 'clean:js', 'copy:dev', 'concat', 'notify:js']
            },
            less: {
                files: 'Less/**/*.less',
                tasks: ['clean:css', 'less', 'notify:less']
            }
        }

    });


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-dev-update');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.task.run('notify_hooks');

    grunt.registerTask('distribute-js', ['concat', 'uglify', 'clean:js']);
    grunt.registerTask('distribute-css', ['less', 'recess', 'clean:css']);
    grunt.registerTask('distribute-files', ['distribute-css', 'distribute-js'/*,'compress:scripts'*/]);

    grunt.registerTask('zip', ['compress:website', 'compress:docu']);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('doc', ['jsdoc', 'markdown']);

    grunt.registerTask('dev', ['clean:css', 'less', 'clean:js', 'concat', 'replace:dev', 'copy:dev', 'notify:dev', 'watch']);
    grunt.registerTask('default', ['test', 'clean', 'distribute-files', 'replace:build', 'copy:dist', 'doc', 'notify:all']);

};