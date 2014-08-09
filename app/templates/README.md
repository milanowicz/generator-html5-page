# <% websiteName %>

<% websiteDescription %>


## Basic Software<% if (supportAssemble) { %>

Assemble - [http://assemble.io/](http://assemble.io/)<% } %>

Bower - [http://bower.io/](http://bower.io/)

NodeJS - [http://nodejs.org/](http://nodejs.org/)

Git - [http://git-scm.com/](http://git-scm.com/)

GruntJS - [http://gruntjs.com/](http://gruntjs.com/)<% if (supportLess) { %>

Less - [http://www.lesscss.org/](http://www.lesscss.org/)<% } if (supportSass) { %>

Sass - [http://sass-lang.com/](http://sass-lang.com/)<% } if (supportCompass) { %>

Compass - [http://compass-style.org/](http://compass-style.org/)<% } %>


### Development Software<% if (includeBootstrap) { %>

Bootstrap - [http://getbootstrap.com/](http://getbootstrap.com/)<% } if (includeButtons) { %>

Buttons - [http://alexwolfe.github.io/Buttons/](http://alexwolfe.github.io/Buttons/)<% } if (includeBrowserDetection) { %>

BrowserDetection.js - [https://github.com/Milanowicz/BrowserDetection.js](https://github.com/Milanowicz/BrowserDetection.js)<% } if (includeCreate) { %>

CreateJS - [http://www.createjs.com/](http://www.createjs.com/)<% } if (includeFontAwesome) { %>

FontAwesome - [http://fontawesome.io/](http://fontawesome.io/)<% } if (includeFoundation) { %>

Foundation - [http://foundation.zurb.com/](http://foundation.zurb.com/)<% } if (includeFitText) { %>

FitText.js - [https://github.com/Milanowicz/FitText.js](https://github.com/Milanowicz/FitText.js)<% } if (includeJqueryUi) { %>

jQuery UI - [http://jqueryui.com/](http://jqueryui.com/)<% } if (includeMasonry) { %>

Masonry - [http://masonry.desandro.com/](http://masonry.desandro.com/)<% } if (includeModernizr) { %>

Modernizr - [http://modernizr.com/](http://modernizr.com/)<% } if (LessCollection) { %>

LessCollection - [https://github.com/Milanowicz/CSSLessCollection](https://github.com/Milanowicz/CSSLessCollection)<% } if (includeSassCollection) { %>

SassCollection - [https://github.com/Milanowicz/CSSSassCollection](https://github.com/Milanowicz/CSSSassCollection)<% } %>


## Directory Structure

Your Documentation about what ever

    Documentation

All JavaScripts libraries or scripts from you or somewhere else

    JavaScript<% if (supportLess) { %>

Your Less StyleSheets are here

    Less<% } if (supportSass) { %>

Your Sass StyleSheets are here

    Sass<% } %>

This directory is for the visitors

    <% distributeDirectory %>


## Bower


### Bower Install

Be first time used ever then

    $ npm install -g Bower


### Bower Usage

Install all Grunt modules and let's roll

    $ bower install

Update all

    $ bower update


## GruntJS


### GruntJS Install

Be first time used ever then

    $ npm install -g grunt-cli

Install all Grunt modules and let's roll

    $ npm install


Create this file to use "$ grunt serve"

    local.json

        {
          "localhost" : "localhost",
          "port": "9000"
        }


### GruntJS Usage

Grunt Watch if files are changes and generate them new

    $ grunt serve

Let Grunt generates all files

    $ grunt build

Do run all Tasks for a Release

    $ grunt


<% if (supportCompress) { %>### Compress files

Create a archiv from the Public directory

    $ grunt compress:website

Create a archiv from whole the Project with all files in it

    $ grunt compress:project

Create a archiv from the Documentation

    $ grunt compress:docu<% } %>


### GruntJS updating

Check Grunt Modules

    $ grunt devUpdate:show

Update GruntJS modules

    $ grunt devUpdate:install

