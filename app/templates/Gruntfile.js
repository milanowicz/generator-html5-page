module.exports = function(grunt) {

    "use strict";

    grunt.initConfig({

        pkg : grunt.file.readJSON('package.json'),

        banner: '/*!\n' +
            ' * <%%= pkg.name %> - <%%= grunt.template.today("yyyy") %> \n' +
            ' * Version <%%= pkg.version %>\n' +
            ' */\n\n',

        clean: {
            js: [
                'Public/JS/<%= _.slugify(websiteName) %>.js',<% if (includeModernizr) { %>
                'Public/JS/Modernizr.js'<% } %>
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
                    'JavaScript/jQuery/jquery-1.11.0.js',
                    'JavaScript/jQuery/jquery-ui-1.10.4.js',
                    'JavaScript/jQuery/jquery.ui.touch-punch.js',
                    'JavaScript/jQuery/jquery.anystretch.js',
                    'JavaScript/jQuery/jquery.backstretch.js',
                    'JavaScript/jQuery/jquery.ba-hashchange.js',
                    'JavaScript/jQuery/jquery.buttons.js',
                    'JavaScript/jQuery/jquery.fittext.js',
                    'JavaScript/jQuery/jquery.prettyPhoto.js',
                    'JavaScript/jQuery/jquery.waypoints.js',
                    'JavaScript/Library/masonry.js',<% } if (includePolyfill) { %>
                    'JavaScript/Library/imagesloaded.js',
                    'JavaScript/Library/respond.js',<% } if (includeCreate) { %>
                    'JavaScript/CreateJS/easeljs-0.7.1.combined.js',
                    'JavaScript/CreateJS/tweenjs-0.5.1.combined.js',
                    'JavaScript/CreateJS/preloadjs-0.4.1.combined.js',
                    'JavaScript/CreateJS/soundjs-0.5.2.combined.js',<% } %>
                    'JavaScript/Main/Canvas.js',
                    'JavaScript/Main/Detection.js',
                    'JavaScript/Main/Main.js',
                    'JavaScript/Main/MainTools.js',
                    'JavaScript/Main/Init.js'
                ],
                dest : 'Public/JS/<%= _.slugify(websiteName) %>.js'
            }
        },

        copy : {
            dev : {
                files : [
                    {
                        expand: true,
                        cwd: 'JavaScript/Library/',
                        src : 'Modernizr.js',
                        dest : 'Public/JS/'
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
                    'JavaScript/Main/Init.js',
                    'JavaScript/Main/Main.js',
                    'JavaScript/Main/MainTools.js',
                    'JavaScript/Main/Canvas.js',
                    'JavaScript/Main/Detection.js',
                    'JavaScript/Main/Documentation.js'
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
                banner : '/*! <%%= pkg.name %> <%%= grunt.template.today("yyyy-mm-dd") %> */\n',
                report : 'min'
            },<% if (includeModernizr) { %>
            Modernizr : {
                src : 'Public/JS/Modernizr.js',
                dest : 'Public/JS/Modernizr.min.js'
            },<% } %>
            main : {
                src : 'Public/JS/<%%= _.slugify(websiteName) %>.js',
                dest : 'Public/JS/<%= _.slugify(websiteName) %>.min.js'
            }
        },

        validation: {
            options: {
                doctype: 'HTML5',
                charset: 'utf-8',
                reset: grunt.option('reset') || false,
                stoponerror: false,
                relaxerror: [
                    "Bad value X-UA-Compatible for attribute http-equiv on element meta."
                ]
            },
            files: {
                src: [
                    'Public/index.html',
                    'Documentation/index.html'
                ]
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
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.task.run('notify_hooks');

    grunt.registerTask('distribute-js', ['concat', 'uglify', 'copy:Modernizr', 'clean:js']);
    grunt.registerTask('distribute-css', ['less', 'recess', 'clean:css']);
    grunt.registerTask('distribute-files', ['distribute-css', 'distribute-js'/*,'compress:scripts'*/]);

    grunt.registerTask('zip', ['compress:website', 'compress:docu']);
    grunt.registerTask('test', ['validation', 'jshint']);
    grunt.registerTask('doc', ['jsdoc', 'markdown']);

    grunt.registerTask('dev', ['clean:css', 'less', 'clean:js', 'concat', 'replace:dev', 'copy:dev', 'notify:dev', 'watch']);
    grunt.registerTask('default', ['test', 'clean', 'distribute-files', 'replace:build', 'doc', 'notify:all']);

};