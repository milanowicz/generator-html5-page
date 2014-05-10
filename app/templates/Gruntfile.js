module.exports = function(grunt) {

    "use strict";

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({

        pkg : grunt.file.readJSON('package.json'),

        banner: '/*!\n' +
            ' * <%%= pkg.name %> - <%%= grunt.template.today("yyyy") %> \n' +
            ' * Version <%%= pkg.version %>\n' +
            ' */\n',

        clean: {
            js: [
                '<%= distributeDirectory %>/JS/<%= _.slugify(websiteName) %>.js',<% if (includeModernizr) { %>
                '<%= distributeDirectory %>/JS/modernizr.js'<% } %>
            ],
            css: [
                '<%= distributeDirectory %>/CSS/<%= _.slugify(websiteName) %>.css'
            ],
            docu: [
                '<%= projectDirectory %>/Documentation/**/*'
            ]
        },

        compress: {
            website: {
                options: {
                    archive: '../<%%= grunt.template.today("yyyymmdd_HHss") %>_<%%= pkg.name %>.zip'
                },
                files: [
                    {
                        src: ['<%= distributeDirectory %>/**'],
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
                        src: ['<%= projectDirectory %>/Documentation/**'],
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
                        cwd: '<%= distributeDirectory %>/JS/',
                        src: ['*.js'],
                        dest: '<%= distributeDirectory %>/JS/',
                        ext: '.gz.js'
                    },{
                        expand: true,
                        cwd: '<%= distributeDirectory %>/CSS/',
                        src: ['*.css'],
                        dest: '<%= distributeDirectory %>/CSS/',
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
                src : [
                    '<%= bowerDirectory %>/jquery/dist/jquery.js',<% if (includeJqueryUi) { %>
                    '<%= bowerDirectory %>/jQueryui/ui/jquery-ui.js',
                    '<%= bowerDirectory %>/jqueryui-touch-punch/jquery.ui.touch-punch.js ',<% } if (includeJqueryPlugins) { %>
                    '<%= bowerDirectory %>/jquery-backstretch/jquery.backstretch.js',
                    '<%= bowerDirectory %>/jquery-hashchange/jquery.ba-hashchange.js',
                    '<%= bowerDirectory %>/Buttons/js/buttons.js',<% } if (includeExample) { %>
                    '<%= bowerDirectory %>/FitText.js/jquery.fittext.js',
                    '<%= bowerDirectory %>/BrowserDetection.js/BrowserDetection.js',<% } if (includeMasonry) { %>
                    '<%= bowerDirectory %>/masonry/dist/masonry.pkgd.js',
                    '<%= bowerDirectory %>/imagesloaded/imagesloaded.pkgd.js',<% } if (includePolyfill) { %>
                    '<%= bowerDirectory %>/respond/dest/respond.src.js',<% } if (includeCreate) { %>
                    '<%= bowerDirectory %>/easeljs/lib/easeljs-0.7.1.combined.js',
                    '<%= bowerDirectory %>/createjs-tweenjs/lib/tweenjs-0.5.1.combined.js',
                    '<%= bowerDirectory %>/createjs-preloadjs/lib/preloadjs-0.4.1.combined.js',
                    '<%= bowerDirectory %>/createjs-soundjs/lib/soundjs-0.5.2.combined.js',
                    '<%= projectDirectory %>/JavaScript/Canvas.js',<% } if (includeExample) { %>
                    '<%= projectDirectory %>/JavaScript/Main.js',
                    '<%= projectDirectory %>/JavaScript/MainTools.js'<% } %>
                ],
                dest : '<%= distributeDirectory %>/JS/<%= _.slugify(websiteName) %>.js'
            }
        },

        copy : {
            dev : {
                files : [<% if (includeModernizr) { %>
                    {
                        expand: true,
                        cwd: '<%= bowerDirectory %>/modernizr/modernizr.js',
                        src : 'modernizr.js',
                        dest : '<%= distributeDirectory %>/JS/'
                    },<% } %>{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/font-awesome/fonts/',
                        src : '*',
                        dest : '<%= distributeDirectory %>/Fonts/'
                    }
                ]
            },
            dist : {
                files : [
                    <% if (includePolyfill) { %>
                    {
                        expand: true,
                        cwd: '<%= bowerDirectory %>/selectivizr/',
                        src : 'selectivizr.js',
                        dest : '<%= distributeDirectory %>/JS/'
                    },{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/css3pie/',
                        src : 'PIE.js',
                        dest : '<%= distributeDirectory %>/JS/'
                    },{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/css3pie/',
                        src : 'PIE.htc',
                        dest : '<%= distributeDirectory %>/JS/'
                    },{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/background-size-polyfill/',
                        src : 'backgroundsize.min.htc',
                        dest : '<%= distributeDirectory %>/JS/'
                    },{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/box-sizing-polyfill/',
                        src : 'boxsizing.htc',
                        dest : '<%= distributeDirectory %>/JS/'
                    },
                    <% } if (includeModernizr) { %>
                    {
                        expand: true,
                        cwd: '<%= bowerDirectory %>/modernizr/',
                        src : 'modernizr.js',
                        dest : '<%= distributeDirectory %>/JS/'
                    },<% } %>{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/font-awesome/fonts/',
                        src : '*',
                        dest : '<%= distributeDirectory %>/Fonts/'
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
                    '<%= projectDirectory %>/JavaScript/**/*.js'
                ],
                options: {
                    destination: '<%= projectDirectory %>/Documentation/jsdoc'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '<%= projectDirectory %>/JavaScript/.jshintrc',
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: [<% if (includeExample) { %>
                    'Website/JavaScript/Main.js',
                    'Website/JavaScript/MainTools.js'<% } %>
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
                    '<%= distributeDirectory %>/CSS/<%= _.slugify(websiteName) %>.css': '<%= projectDirectory %>/Less/PageStyle.less'
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
                        dest: '<%= projectDirectory %>/Documentation/ProjectReadMe.html'
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
                    '<%= distributeDirectory %>/CSS/<%= _.slugify(websiteName) %>.css'
                ],
                dest: '<%= distributeDirectory %>/CSS/<%= _.slugify(websiteName) %>.min.css'
            }
        },

        replace: {
            dev: {
                src: [
                    '<%= distributeDirectory %>/index.html'
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
                    '<%= distributeDirectory %>/index.html'
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
                src : '<%= bowerDirectory %>/modernizr/modernizr.js',
                dest : '<%= distributeDirectory %>/JS/modernizr.min.js'
            },<% } %>
            main : {
                src : '<%= distributeDirectory %>/JS/<%= _.slugify(websiteName) %>.js',
                dest : '<%= distributeDirectory %>/JS/<%= _.slugify(websiteName) %>.min.js'
            }
        },

        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static('<%= distributeDirectory %>')
                        ];
                    }
                }
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
            },
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '<%= distributeDirectory %>/{,*/}*.html',
                    '<%= distributeDirectory %>/CSS/{,*/}*.css',
                    '<%= distributeDirectory %>/JS/{,*/}*.js',
                    '<%= distributeDirectory %>/Images/{,*/}*'
                ]
            }
        }

    });

    grunt.task.run('notify_hooks');

    grunt.registerTask('distribute-js', ['concat', 'uglify', 'clean:js']);
    grunt.registerTask('distribute-css', ['less', 'recess', 'clean:css']);
    grunt.registerTask('distribute-files', ['distribute-css', 'distribute-js'/*,'compress:scripts'*/]);

    grunt.registerTask('zip', ['compress:website', 'compress:docu']);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('doc', ['jsdoc', 'markdown']);

    grunt.registerTask('serve', [
        'clean:css',
        'less',
        'clean:js',
        'concat',
        'replace:dev',
        'copy:dev',
        'connect:livereload',
        'notify:dev',
        'watch'
    ]);

    grunt.registerTask('build', [
        'test',
        'distribute-files',
        'replace:build',
        'copy:dist',
    ]);

    grunt.registerTask('default', [
        'clean',
        'build',
        'doc',
        'notify:all'
    ]);

};