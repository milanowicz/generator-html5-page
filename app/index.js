'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


/**
 * Init HTML5 Page Yeoman Generator
 * @type {Html5generator}
 */
var Html5PageGenerator = module.exports = function Html5pagegenerator(args, options, config) {

    yeoman.generators.Base.apply(this, arguments);
    this.options = options;
    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));


    this.on('end', function () {
        if (!this.options['skip-install']) {
            this.installDependencies({
                skipInstall: this.options['skip-install'],
                callback: function () {
                    if (this.GruntTask === 'build') {
                        this.spawnCommand('grunt')
                            .on('exit', function () {
                                console.log('\n\n\t\tA new HTML5 Website served by Yeoman\n\n');
                            });
                    } else if (this.GruntTask === 'serve') {
                        console.log('\n\n\t\tA new HTML5 Website served by Yeoman\n\n');
                        this.spawnCommand('grunt', ['serve']);
                    }
                }.bind(this)
            });
        }
    });
};

util.inherits(Html5PageGenerator, yeoman.generators.Base);


/**
 * User Prompt for the installation for the new Project
 */
Html5PageGenerator.prototype.askFor = function askFor () {
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
        default: 'website'
    },{
        type: 'input',
        name: 'distributeDirectory',
        message: 'Enter your Distribute Directory',
        default: 'public'
    },{
        type: 'input',
        name: 'bowerDirectory',
        message: 'Enter your Bower Resource Directory',
        default: 'bower_components'
    },{
        type: 'checkbox',
        name: 'cssLang',
        message: 'Which CSS extension language should be GruntJS supported?',
        choices: [{
            name: 'LESS - http://lesscss.org/',
            value: 'less',
            checked: true
        },{
            name: 'SASS - http://sass-lang.com/',
            value: 'sass',
            checked: false
        },{
            name: 'Compass - http://compass-style.org/',
            value: 'compass',
            checked: false
        }]
    },{
        type: 'checkbox',
        name: 'cssFramework',
        message: 'Which CSS extension language should be GruntJS supported?',
        choices: [{
            name: 'Bootstrap - http://getbootstrap.com/',
            value: 'bootstrap',
            checked: false
        },{
            name: 'Foundation - http://foundation.zurb.com/',
            value: 'foundation',
            checked: false
        }]
    },{
        type: 'list',
        name: 'jQueryVerion',
        message: 'Which jQuery Version should it be? - http://jquery.com/',
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
            name: 'Buttons - http://alexwolfe.github.io/Buttons/',
            value: 'includeButtons',
            checked: false
        },{
            name: 'BrowserDetection.js - https://github.com/Milanowicz/BrowserDetection.js',
            value: 'includeBrowserDetection',
            checked: true
        },{
            name: 'CreateJS Framework - http://www.createjs.com/',
            value: 'includeCreate',
            checked: false
        },{
            name: 'Font Awesome - http://fortawesome.github.io/Font-Awesome/',
            value: 'includeFontAwesome',
            checked: false
        },{
            name: 'FitText.js - https://github.com/Milanowicz/FitText.js',
            value: 'includeFitText',
            checked: true
        },{
            name: 'Include Project description, example libraries, files and pictures',
            value: 'includeExample',
            checked: false
        },{
            name: 'Internet Explorer Polyfill libraries',
            value: 'includePolyfill',
            checked: true
        },{
            name: 'jQuery Plug-Ins - Backstretch and Hashchange',
            value: 'includeJqueryPlugins',
            checked: false
        },{
            name: 'jQuery UserInterface Framework - http://jqueryui.com/',
            value: 'includeJqueryUi',
            checked: false
        },{
            name: 'Masonry and Imagesloaded Plug-In - http://masonry.desandro.com/',
            value: 'includeMasonry',
            checked: false
        },{
            name: 'Modernizr - http://modernizr.com/',
            value: 'includeModernizr',
            checked: true
        }]
    },{
        type: 'list',
        name: 'GruntTask',
        message: 'What should GruntJS do?',
        choices: [{
            name: 'Run grunt command',
            value: 'build'
        },{
            name: 'Run grunt serve command',
            value: 'serve'
        }]
    }];

    this.prompt(prompts, function (answers) {

        var features    = answers.features;
        var cssLang     = answers.cssLang;
        var cssFramwork = answers.cssFramework;
        var today       = new Date();

        function hasFeature (feat) {
            return features.indexOf(feat) !== -1;
        }
        function hasLang (lang) {
            return cssLang.indexOf(lang) !== -1;
        }
        function hasFramework (framework) {
            return cssFramwork.indexOf(framework) !== -1;
        }

        this.websiteName            = answers.websiteName;
        this.websiteDescription     = answers.websiteDescription;
        this.projectDirectory       = this._.slugify(answers.projectDirectory);
        this.distributeDirectory    = this._.slugify(answers.distributeDirectory);

        if (answers.bowerDirectory === 'bower_components') {
            this.bowerDirectory     = 'bower_components';
        } else {
            this.bowerDirectory     = this._.slugify(answers.bowerDirectory);
        }

        this.jQueryVerion           = answers.jQueryVerion;
        this.GruntTask              = answers.GruntTask;

        this.includeBootstrap       = hasFramework('bootstrap')
        this.includeButtons         = hasFeature('includeButtons');
        this.includeBrowserDetection= hasFeature('includeBrowserDetection');
        this.includeCreate          = hasFeature('includeCreate');
        this.includeExample         = hasFeature('includeExample');
        this.includeFontAwesome     = hasFeature('includeFontAwesome');
        this.includeFoundation      = hasFramework('foundation')
        this.includeFitText         = hasFeature('includeFitText');
        this.includeJqueryUi        = hasFeature('includeJqueryUi');
        this.includeJqueryPlugins   = hasFeature('includeJqueryPlugins');
        this.includeMasonry         = hasFeature('includeMasonry');
        this.includeModernizr       = hasFeature('includeModernizr');
        this.includePolyfill        = hasFeature('includePolyfill');

        this.supportLess            = hasLang('less');
        this.supportSass            = hasLang('sass');
        this.supportCompass         = hasLang('compass');

        this.year                   = today.getFullYear();

        done();
    }.bind(this));
};


/**
 * Generate all project files and directories
 */
Html5PageGenerator.prototype.app = function app () {

    this.mkdir(this.distributeDirectory);
    this.mkdir(this.distributeDirectory + '/css');
    this.mkdir(this.distributeDirectory + '/fonts');
    this.mkdir(this.distributeDirectory + '/images');
    this.mkdir(this.distributeDirectory + '/images/favicon');
    this.mkdir(this.distributeDirectory + '/js');


    this.template('_package.json',      'package.json');
    this.template('_bower.json',        'bower.json');
    if (this.bowerDirectory !== 'bower_components') {
        this.template('_bowerrc',           '.bowerrc');
    }
    this.template('gitignore',          '.gitignore');
    this.template('Gruntfile.js',       'Gruntfile.js');
    this.template('README.md',          'README.md');
    this.template('index.html',         this.distributeDirectory + '/index.html');
    this.copy(    'robots.txt',         this.distributeDirectory + '/robots.txt');
    this.copy(    'htaccess',           this.distributeDirectory + '/_.htaccess');
    this.copy(    'htaccess',           this.distributeDirectory + '/.htaccess');
    this.copy(    'editorconfig',       '.editorconfig');
    this.copy(    '_local.json',        'local.json');


    if (this.includeExample) {
        this.directory('Images',        this.distributeDirectory + '/images/Logo');
    }
    this.directory('Favicon',           this.distributeDirectory + '/images/favicon');


    this.mkdir(this.projectDirectory);
    this.mkdir(this.projectDirectory + '/JavaScript');
    this.copy('jshintrc',               this.projectDirectory + '/JavaScript/.jshintrc');
    this.template('Main/Main.js',       this.projectDirectory + '/JavaScript/Main.js');
    this.template('Main/_Main.js',      this.projectDirectory + '/JavaScript/' + this._.slugify(this.websiteName) + '.js');
    if (this.includeExample) {
        this.template('Main/_MainTools.js', this.projectDirectory + '/JavaScript/MainTools.js');
        if (this.includeCreate) {
            this.copy('Main/Canvas.js', this.projectDirectory + '/JavaScript/Canvas.js');
        }
    }


    if (this.supportLess) {
        this.mkdir(this.projectDirectory + '/Less');
        this.template('Styles/PageStyle.less', this.projectDirectory + '/Less/PageStyle.less');
        this.template('Styles/MainStyle.less', this.projectDirectory + '/Less/MainStyle.less');
    }

    if (this.supportSass) {
        this.mkdir(this.projectDirectory + '/Sass');
        this.template('Styles/PageStyle.scss', this.projectDirectory + '/Sass/PageStyle.scss');
        this.template('Styles/MainStyle.scss', this.projectDirectory + '/Sass/MainStyle.scss');
    }

};