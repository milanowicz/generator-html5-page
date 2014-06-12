module.exports = function(grunt) {

    "use strict";

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Read local JSON config into Variable
    var setting = '';
    if (grunt.file.exists('local.json')) {
        setting = grunt.file.readJSON('local.json');
    } else {
        setting = false;
    }

    grunt.initConfig({

        pkg : grunt.file.readJSON('package.json'),

        setting : setting,

        banner: '/*!\n' +
            ' * <%%= pkg.name %> - <%%= grunt.template.today("yyyy") %> \n' +
            ' * Version <%%= pkg.version %>\n' +
            ' */\n',

        clean: {
            js: [
                '<%= distributeDirectory %>/js/<%= _.slugify(websiteName) %>.js',<% if (includeModernizr) { %>
                '<%= distributeDirectory %>/js/modernizr.js'<% } %>
            ],
            css: [
                '<%= distributeDirectory %>/css/<%= _.slugify(websiteName) %>.css'
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
            project: {
                options: {
                    archive: '../<%%= grunt.template.today("yyyymmdd") %>_<%%= pkg.name %>.zip'
                },
                files: [
                    {
                        src: [
                            '<%= projectDirectory %>',
                            '<%= distributeDirectory %>',
                            'README.md',
                            '.bowerrc',
                            'bower.json',
                            'Gruntfile.js',
                            'package.json'
                        ],
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
                        cwd: '<%= distributeDirectory %>/js/',
                        src: ['*.js'],
                        dest: '<%= distributeDirectory %>/js/',
                        ext: '.gz.js'
                    },{
                        expand: true,
                        cwd: '<%= distributeDirectory %>/css/',
                        src: ['*.css'],
                        dest: '<%= distributeDirectory %>/css/',
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
                    '<%= bowerDirectory %>/jquery-hashchange/jquery.ba-hashchange.js',<% } if (includeButtons) { %>
                    '<%= bowerDirectory %>/Buttons/js/buttons.js',<% } if (includeFitText) { %>
                    '<%= bowerDirectory %>/RWD-FitText.js/jquery.fittext.js',<% } if (includeBrowserDetection) { %>
                    '<%= bowerDirectory %>/BrowserDetection.js/BrowserDetection.js',<% } if (includeMasonry) { %>
                    '<%= bowerDirectory %>/masonry/dist/masonry.pkgd.js',
                    '<%= bowerDirectory %>/imagesloaded/imagesloaded.pkgd.js',<% } if (includePolyfill) { %>
                    '<%= bowerDirectory %>/respond/dest/respond.src.js',<% } if (includeCreate) { %>
                    '<%= bowerDirectory %>/easeljs/lib/easeljs-0.7.1.combined.js',
                    '<%= bowerDirectory %>/createjs-tweenjs/lib/tweenjs-0.5.1.combined.js',
                    '<%= bowerDirectory %>/createjs-preloadjs/lib/preloadjs-0.4.1.combined.js',
                    '<%= bowerDirectory %>/createjs-soundjs/lib/soundjs-0.5.2.combined.js',<% } if (includeBootstrap) { %>
                    '<%= bowerDirectory %>/bootstrap/dist/js/bootstrap.js'<% } if (includeFoundation) { %>
                    '<%= bowerDirectory %>/foundation/js/foundation/foundation.js'
                    '<%= bowerDirectory %>/foundation/js/foundation/foundation.abide.js'
                    '<%= bowerDirectory %>/foundation/js/foundation/foundation.accordion.js'
                    '<%= bowerDirectory %>/foundation/js/foundation/foundation.alert.js'
                    '<%= bowerDirectory %>/foundation/js/foundation/foundation.clearing.js'
                    '<%= bowerDirectory %>/foundation/js/foundation/foundation.dropdown.js'
                    '<%= bowerDirectory %>/foundation/js/foundation/foundation.equalizer.js'
                    '<%= bowerDirectory %>/foundation/js/foundation/foundation.interchange.js'
                    '<%= bowerDirectory %>/foundation/js/foundation/foundation.joyride.js'
                    '<%= bowerDirectory %>/foundation/js/foundation/foundation.magellan.js'
                    '<%= bowerDirectory %>/foundation/js/foundation/foundation.offcanvas.js'
                    '<%= bowerDirectory %>/foundation/js/foundation/foundation.orbit.js'
                    '<%= bowerDirectory %>/foundation/js/foundation/foundation.reveal.js'
                    '<%= bowerDirectory %>/foundation/js/foundation/foundation.slider.js'
                    '<%= bowerDirectory %>/foundation/js/foundation/foundation.tab.js'
                    '<%= bowerDirectory %>/foundation/js/foundation/foundation.tooltip.js'
                    '<%= bowerDirectory %>/foundation/js/foundation/foundation.topbar.js'<% } %>
                    '<%= projectDirectory %>/JavaScript/Main.js',<% if (includeExample) { %>
                    '<%= projectDirectory %>/JavaScript/MainTools.js',<% } if (includeExample && includeCreate) { %>
                    '<%= projectDirectory %>/JavaScript/Canvas.js',<% } %>
                    '<%= projectDirectory %>/JavaScript/<%= _.slugify(websiteName) %>.js'
                ],
                dest : '<%= distributeDirectory %>/js/<%= _.slugify(websiteName) %>.js'
            }
        },

        copy : {
            dev : {
                files : [<% if (includeBootstrap) { %>{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/bootstrap/dist/fonts',
                        src : '*',
                        dest : '<%= distributeDirectory %>/fonts/'
                    }<% } if (includeBootstrap && includeModernizr) { %>,<% } if (includeModernizr) { %>{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/modernizr/',
                        src : 'modernizr.js',
                        dest : '<%= distributeDirectory %>/js/'
                    }<% } if ((includeBootstrap || includeModernizr) && includeFontAwesome) { %>,<% } if (includeFontAwesome) { %>{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/font-awesome/fonts/',
                        src : '*',
                        dest : '<%= distributeDirectory %>/Fonts/'
                    }<% } %>
                ]
            },
            dist : {
                files : [<% if (includeBootstrap) { %>{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/bootstrap/dist/fonts',
                        src : '*',
                        dest : '<%= distributeDirectory %>/fonts/'
                    }<% } if (includeBootstrap && includePolyfill) { %>,<% } if (includePolyfill) {%>{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/selectivizr/',
                        src : 'selectivizr.js',
                        dest : '<%= distributeDirectory %>/js/'
                    },{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/css3pie/',
                        src : 'PIE.js',
                        dest : '<%= distributeDirectory %>/js/'
                    },{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/css3pie/',
                        src : 'PIE.htc',
                        dest : '<%= distributeDirectory %>/js/'
                    },{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/background-size-polyfill/',
                        src : 'backgroundsize.min.htc',
                        dest : '<%= distributeDirectory %>/js/'
                    },{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/box-sizing-polyfill/',
                        src : 'boxsizing.htc',
                        dest : '<%= distributeDirectory %>/js/'
                    }<% } if ((includeBootstrap || includePolyfill) && includeModernizr) { %>,<% } if (includeModernizr) {%>{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/modernizr/',
                        src : 'modernizr.js',
                        dest : '<%= distributeDirectory %>/js/'
                    }<% } if ((includeBootstrap || includePolyfill || includeModernizr) && includeFontAwesome) { %>,<% } if (includeFontAwesome) { %>{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/font-awesome/fonts/',
                        src : '*',
                        dest : '<%= distributeDirectory %>/fonts/'
                    }<% } %>
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
        },<% if (supportLess) { %>

        less: {
            options: {
                compress: false,
                clancss: false,
                strictMath: true,
                ieCompat: true
            },
            main: {
                files: {
                    '<%= distributeDirectory %>/css/<%= _.slugify(websiteName) %>.css': '<%= projectDirectory %>/Less/PageStyle.less'
                }
            }
        },<% } %>

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
            css: {
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
                    '<%= distributeDirectory %>/css/<%= _.slugify(websiteName) %>.css'
                ],
                dest: '<%= distributeDirectory %>/css/<%= _.slugify(websiteName) %>.min.css'
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
        },<% if (supportSass) { %>

        sass_imports: {
            options: {
                inlineCSS: true
            },
            main : {
                src: [
                    '<%= bowerDirectory %>/normalize-css/normalize.css'<% if (includeFontAwesome) { %>,
                    '<%= bowerDirectory %>/font-awesome/css/font-awesome.css'<% } if (includeJqueryUi) { %>,
                    '<%= bowerDirectory %>/jQueryui/themes/base/jquery-ui.css'<% } if (includeButtons) { %>,
                    '<%= bowerDirectory %>/Buttons/css/buttons.css'<% } %>
                ],
                dest: '<%= projectDirectory %>/Sass/ImportLibrary.scss'
            }
        },

        sass : {
            options : {
                style: 'expanded'
            },
            main : {
                files: {
                    '<%= distributeDirectory %>/css/<%= _.slugify(websiteName) %>.css': '<%= projectDirectory %>/Sass/PageStyle.scss'
                }
            }
        },<% } %>

        uglify : {
            options : {
                banner : '<%%= banner %>',
                report : 'min'
            },<% if (includeModernizr) { %>
            Modernizr : {
                src : '<%= bowerDirectory %>/modernizr/modernizr.js',
                dest : '<%= distributeDirectory %>/js/modernizr.min.js'
            },<% } %>
            main : {
                src : '<%= distributeDirectory %>/js/<%= _.slugify(websiteName) %>.js',
                dest : '<%= distributeDirectory %>/js/<%= _.slugify(websiteName) %>.min.js'
            }
        },

        connect: {
            options: {
                port: setting.port,
                open: true,
                livereload: 35729,
                hostname: setting.localhost
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
            js: {
                files: '<%%= jshint.src.src %>',
                tasks: [
                    'jshint:src',
                    'clean:js',
                    'copy:dev',
                    'concat',
                    'notify:js'
                ]
            },
            css: {
                files: [
                    <% if (supportLess) { %>'<%= projectDirectory %>/Less/**/*.less'<% } if (supportLess && supportSass) { %>,
                    <% } if (supportSass) { %>'<%= projectDirectory %>/Sass/**/*.scss'<% } %>
                ],
                tasks: [
                    'clean:css',<% if (supportLess) { %>
                    'less',<% } if (supportSass) { %>
                    'sass_imports',
                    'sass',<% } %>
                    'notify:css'
                ]
            },
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '<%= distributeDirectory %>/{,*/}*.html',
                    '<%= distributeDirectory %>/css/{,*/}*.css',
                    '<%= distributeDirectory %>/js/{,*/}*.js',
                    '<%= distributeDirectory %>/images/{,*/}*'
                ]
            }
        }

    });

    grunt.task.run('notify_hooks');

    grunt.registerTask('distribute-js', [
        'concat',
        'uglify'
    ]);
    grunt.registerTask('distribute-css', [<% if (supportLess) { %>
        'less',<% } if (supportSass) { %>
        'sass_imports',
        'sass',<% } %>
        'recess'
    ]);
    grunt.registerTask('distribute-files', [
        'distribute-css',
        'distribute-js'/*,
        'compress:scripts'*/
    ]);

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('doc', ['jsdoc', 'markdown']);

    grunt.registerTask('build', [
        'test',
        'clean:css',
        'clean:js',
        'distribute-files',
        'copy:dist',
    ]);

    grunt.registerTask('serve', [
        'clean:css',<% if (supportLess) { %>
        'less',<% } if (supportSass) { %>
        'sass_imports',
        'sass',<% } %>
        'clean:js',
        'concat',
        'replace:dev',
        'copy:dev',
        'connect:livereload',
        'notify:dev',
        'watch'
    ]);

    grunt.registerTask('default', [
        'build',
        'clean',
        'replace:build',
        'doc',
        'notify:all'
    ]);

};