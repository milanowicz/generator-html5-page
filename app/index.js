'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var Html5Generator = yeoman.generators.Base.extend({

    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies({
                    skipInstall: this.options['skip-install'],
                    callback: function () {
                        this.spawnCommand('grunt')
                            .on('exit', function () {
                                console.log('\n\n\t\tA new HTML5 Website served by Yeoman\n\n');
                            });
                    }.bind(this)
                });
            }
        });
    },

    askFor: function () {
        var done = this.async();

        // have Yeoman greet the user
        this.log(this.yeoman);
        this.log(chalk.magenta('Welcome to the HTML5 Website Skeleton Generator!'));

        var prompts = [{
            type: 'input',
            name: 'websiteName',
            message: 'What do you want to call your Website?',
            default: 'Project'
        },{
            type: 'input',
            name: 'websiteDescription',
            message: 'What is your description for it?'
        },{
            type: 'input',
            name: 'projectDirectory',
            message: 'Enter your Project Directory',
            default: 'Website'
        },{
            type: 'input',
            name: 'distributeDirectory',
            message: 'Enter your Distribute Directory',
            default: 'Public'
        },{
            type: 'input',
            name: 'bowerDirectory',
            message: 'Enter your Bower Resource Directory',
            default: 'bower_components'
        },{
            type: 'list',
            name: 'jQueryVerion',
            message: 'Which jQuery Version should it be?',
            choices: [{
                name: 'Version 1.11.x',
                value: 'One'
            },{
                name: 'Version 2.1.x',
                value: 'Two'
            }]
        },{
            type: 'checkbox',
            name: 'features',
            message: 'What Software would you like to have for your new project?',
            choices: [{
                name: 'CreateJS Framework',
                value: 'includeCreate',
                checked: false
            },{
                name: 'Include Project description, example libraries, files and pictures',
                value: 'includeExample',
                checked: true
            },{
                name: 'Internet Explorer Polyfill libraries',
                value: 'includePolyfill',
                checked: true
            },{
                name: 'jQuery Plug-Ins - Backstretch, Haschange and Buttons',
                value: 'includeJqueryPlugins',
                checked: false
            },{
                name: 'jQuery UserInterface Framework',
                value: 'includeJqueryUi',
                checked: true
            },{
                name: 'Masonry and Imagesloaded Plug-In',
                value: 'includeMasonry',
                checked: true
            },{
                name: 'Modernizr',
                value: 'includeModernizr',
                checked: true
            }]
        }];

        this.prompt(prompts, function (answers) {

            var features    = answers.features;
            var today       = new Date();

            function hasFeature (feat) {
                return features.indexOf(feat) !== -1;
            }

            this.websiteName            = answers.websiteName;
            this.websiteDescription     = answers.websiteDescription;
            this.projectDirectory       = answers.projectDirectory;
            this.distributeDirectory    = answers.distributeDirectory;
            this.bowerDirectory         = answers.bowerDirectory;

            this.jQueryVerion           = answers.jQueryVerion;

            this.includeExample         = hasFeature('includeExample');
            this.includeJqueryUi        = hasFeature('includeJqueryUi');
            this.includeJqueryPlugins   = hasFeature('includeJqueryPlugins');
            this.includeMasonry         = hasFeature('includeMasonry');
            this.includeModernizr       = hasFeature('includeModernizr');
            this.includeCreate          = hasFeature('includeCreate');
            this.includePolyfill        = hasFeature('includePolyfill');

            this.year                   = today.getFullYear();

            done();
        }.bind(this));
    },

    app: function () {

        this.mkdir(this.distributeDirectory);
        this.mkdir(this.distributeDirectory + '/CSS');
        this.mkdir(this.distributeDirectory + '/Fonts');
        this.mkdir(this.distributeDirectory + '/Images');
        if (this.includeExample) {
            this.mkdir(this.distributeDirectory + '/Images/Favicon');
        }
        this.mkdir(this.distributeDirectory + '/JS');

        this.template('_package.json',      'package.json');
        this.template('_bower.json',        'bower.json');
        this.template('_bowerrc',           '.bowerrc');
        this.template('gitignore',          '.gitignore');
        this.template('Gruntfile.js',       'Gruntfile.js');
        this.template('index.html',         this.distributeDirectory + '/index.html');
        this.copy(    'robots.txt',         this.distributeDirectory + '/robots.txt');
        this.copy(    'htaccess',           this.distributeDirectory + '/_.htaccess');
        this.copy(    'htaccess',           this.distributeDirectory + '/.htaccess');
        this.copy(    'README.md',          'README.md');
        this.copy(    'editorconfig',       '.editorconfig');


        if (this.includeExample) {
            this.directory('Favicon', this.distributeDirectory + '/Images/Favicon');
            this.directory('Images', this.distributeDirectory + '/Images/Logo');
        }


        this.mkdir(this.projectDirectory);
        this.mkdir(this.projectDirectory + '/JavaScript');
        this.mkdir(this.projectDirectory + '/Less');

        this.copy('jshintrc', this.projectDirectory + '/JavaScript/.jshintrc');

        if (this.includeCreate) {
            this.copy('Main/Canvas.js', this.projectDirectory + '/JavaScript/Canvas.js');
        }

        if (this.includeExample) {
            this.copy('Main/Main.js', this.projectDirectory + '/JavaScript/Main.js');
            this.copy('Main/MainTools.js', this.projectDirectory + '/JavaScript/MainTools.js');
        }

        this.template('Styles/PageStyle.less', this.projectDirectory + '/Less/PageStyle.less');
        this.copy(    'Styles/MainStyle.less', this.projectDirectory + '/Less/MainStyle.less');

    }

});

module.exports = Html5Generator;