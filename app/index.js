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
                this.installDependencies();
            }
        });
    },

    askFor: function () {
        var done = this.async();

        // have Yeoman greet the user
        this.log(this.yeoman);

        // replace it with a short and sweet description of your generator
        this.log(chalk.magenta('Welcome to the HTML5 Website Skeleton Generator!'));

        var prompts = [{
            type: 'input',
            name: 'websiteName',
            message: 'What do you want to call your Website?'
        },{
            type: 'checkbox',
            name: 'features',
            message: 'What more would you like?',
            choices: [{
                name: 'jQuery',
                value: 'includeJquery',
                checked: true
            },{
                name: 'Modernizr',
                value: 'includeModernizr',
                checked: true
            },{
                name: 'CreateJS',
                value: 'includeCreate',
                checked: false
            },{
                name: 'Internet Explorer Polyfill',
                value: 'includePolyfill',
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
            this.includeJquery = hasFeature('includeJquery');
            this.includeModernizr = hasFeature('includeModernizr');
            this.includeCreate = hasFeature('includeCreate');
            this.includePolyfill = hasFeature('includePolyfill');

            this.year = today.getFullYear();

            done();
        }.bind(this));
    },

    documentation : function () {
        this.mkdir('Documentation');
    },

    javascript : function () {
        this.mkdir('JavaScript');
        this.mkdir('JavaScript/Main');

        this.directory('Main', 'JavaScript/Main');
    },

    less : function () {
        this.mkdir('Less');
        this.mkdir('Less/Library');
        this.mkdir('Less/Mixins');
        this.mkdir('Less/Styles');

        this.directory('Mixins', 'Less/Mixins');
        this.directory('Styles', 'Less/Styles');
    },

    public: function () {
        this.mkdir('Public');
        this.mkdir('Public/CSS');
        this.mkdir('Public/Fonts');
        this.mkdir('Public/Images');
        this.mkdir('Public/Images/Favicon');
        this.mkdir('Public/JS');

        this.directory('Favicon', 'Public/Images/Favicon');
    },

    app: function () {
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
        this.copy('jshintrc', 'JavaScript/.jshintrc');
    }

});

module.exports = Html5Generator;