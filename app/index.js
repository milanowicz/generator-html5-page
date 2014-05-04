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
                        this.spawnCommand('grunt');
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
            message: 'What do you want to call your Website?'
        },{
            type: 'input',
            name: 'websiteDescription',
            message: 'What is your description for it?'
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
                name: 'jQuery Plug-Ins - Backstretch and Buttons',
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

            var features = answers.features;
            var today = new Date();

            function hasFeature (feat) {
                return features.indexOf(feat) !== -1;
            }

            this.websiteName = answers.websiteName;
            this.websiteDescription = answers.websiteDescription;


            this.includeExample = hasFeature('includeExample');
            this.includeJqueryUi = hasFeature('includeJqueryUi');
            this.includeJqueryPlugins = hasFeature('includeJqueryPlugins');
            this.includeMasonry = hasFeature('includeMasonry');
            this.includeModernizr = hasFeature('includeModernizr');
            this.includeCreate = hasFeature('includeCreate');
            this.includePolyfill = hasFeature('includePolyfill');

            this.year = today.getFullYear();

            done();
        }.bind(this));
    },

    app: function () {

        this.mkdir('Public');
        this.mkdir('Public/CSS');
        this.mkdir('Public/Fonts');
        this.mkdir('Public/Images');
        if (this.includeExample) {
            this.mkdir('Public/Images/Favicon');
        }
        this.mkdir('Public/JS');

        this.template('_package.json', 'package.json');
        this.template('_bower.json', 'bower.json');
        this.template('Gruntfile.js', 'Gruntfile.js');
        this.template('index.html', 'Public/index.html');

        this.copy('robots.txt', 'Public/robots.txt');
        this.copy('htaccess', 'Public/_.htaccess');
        this.copy('htaccess', 'Public/.htaccess');
        this.copy('README.md', 'README.md');
        this.copy('editorconfig', '.editorconfig');
        this.copy('gitignore', '.gitignore');

        if (this.includeExample) {
            this.directory('Favicon', 'Public/Images/Favicon');
            this.directory('Images', 'Public/Images/Logo');
        }

    },

    website : function () {

        this.mkdir('Website');
        this.mkdir('Website/JavaScript');
        this.mkdir('Website/Less');

        this.copy('jshintrc', 'Website/JavaScript/.jshintrc');

        if (this.includeCreate) {
            this.copy('Main/Canvas.js', 'Website/JavaScript/Canvas.js');
        }

        if (this.includeExample) {
            this.copy('Main/Main.js', 'Website/JavaScript/Main.js');
            this.copy('Main/MainTools.js', 'Website/JavaScript/MainTools.js');
        }

        this.directory('Styles', 'Website/Less');

    }

});

module.exports = Html5Generator;