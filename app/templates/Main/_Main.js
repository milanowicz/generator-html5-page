(function (w) {

    /**
     * <%= websiteName %> Object
     * @namespace <%= _.slugify(websiteName) %>
     * @version 0.0.1
     */
    w.<%= _.slugify(websiteName) %> = w.<%= _.slugify(websiteName) %> || {

        /**
         * Main.Init call all functions you want ;)
         * @return void
         */
        init : function () {

            <% if (includeBrowserDetection) { %>
            /**
             * Fill Main object variables by these functions
             */
            Detection.CheckAll();
            <% } if (includeExample) { %>
            /**
             * Init functions . . .
             */
            Main.Tools.showTooltip('a');
            Main.Tools.showTooltip('img');
            Main.Tools.fitText();
            Main.Tools.checkSvg();
            <% } %>

            // Set a trigger
            Main.trigger();

        }

    };

})(window);


/**
 * Init Main JavaScript Object
 */
if (typeof(jQuery) === 'undefined') {
    console.log('jQuery Framework is required!');<% if (includeCreate) { %>
} else if (typeof(createjs) === 'undefined') {
    console.log('CreateJS Framework is required!');<% } %>
} else {

    $(document).ready(<%= _.slugify(websiteName) %>.init);

} // End of if