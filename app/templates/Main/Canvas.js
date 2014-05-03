(function (w) {

    /**
     * CreateJS Canvas Object
     * @type {{cCanvas: undefined, cStage: undefined, cPreload: undefined, LoadImage: boolean, isMobile: boolean, ScaleMobile: number, Pictures: {}, Manifest: Array, LastElement: undefined, CurrentElement: undefined, InitStage: InitStage, PreloadImages: PreloadImages, ImageProgress: ImageProgress, ImageLoading: ImageLoading, LoadImageComplete: LoadImageComplete, AnimationTicker: AnimationTicker, BindDragOnStage: BindDragOnStage, BindClickOnElement: BindClickOnElement}}
     * @namespace Canvas
     */
    w.Canvas = w.Canvas || {

        /**
         * CreateJS objects
         */
        cCanvas         : undefined,
        cStage          : undefined,
        cPreload        : undefined,
        LoadImage       : false,
        isMobile        : false,
        ScaleMobile     : 0,
        Pictures        : {},
        Manifest        : [],
        LastElement     : undefined,
        CurrentElement  : undefined,


        /**
         * Get Canvas, init Stage and preload Images
         * after that call the function LoadImageComplete
         * @param {string} CanvasId - HTML Canvas Identifier
         * @param {number} Width - Canvas Width
         * @param {number} Height - Canvas Height
         * @return void
         */
        InitStage : function (CanvasId, Width, Height) {

            // Check if Devices Mobile is ?
            if (createjs.Touch.isSupported()) {
                Canvas.isMobile = true;
            } // End of if

            if (typeof(Canvas.cCanvas) === 'undefined') {

                var CanvasIdName = '';

                // Cut Id Name from it
                if (CanvasId.indexOf('#') !== -1) {
                    CanvasIdName = CanvasId.substring(CanvasId.indexOf('#') + 1);
                } else {
                    CanvasIdName = CanvasId;
                }

                Canvas.cCanvas = document.getElementById(CanvasIdName);

                if (Canvas.isMobile) {

                    if (typeof(window.devicePixelRatio) !== 'undefined') {
                        Canvas.ScaleMobile = window.devicePixelRatio;
                    } else {
                        Canvas.ScaleMobile = 1;
                    }

                    if (Width > 0) {
                        Canvas.cCanvas.width = (Width * Canvas.ScaleMobile);
                    } else {
                        Canvas.cCanvas.width = ($(window).width() * Canvas.ScaleMobile);
                    }

                    if (Height > 0) {
                        Canvas.cCanvas.height = Height * Canvas.ScaleMobile;
                    } else {
                        Canvas.cCanvas.height = $(window).height() * Canvas.ScaleMobile;
                    }

                } else {

                    if (Width > 0) {
                        Canvas.cCanvas.width = Width;
                    } else {
                        Canvas.cCanvas.width = $(window).width();
                    }

                    if (Height > 0) {
                        Canvas.cCanvas.height = Height;
                    } else {
                        Canvas.cCanvas.height = $(window).height();
                    }

                } // End of if

            } // End of if


            // Init stage for CreateJS
            if (typeof(Canvas.cStage) === 'undefined') {

                Canvas.cStage = new createjs.Stage(Canvas.cCanvas);

            } else {

                /**
                 * Remove Ticker Event and all Objects from the Stage
                 */
                createjs.Ticker.removeEventListener("tick", Canvas.AnimationTicker);
                Canvas.cStage.autoClear = true;
                Canvas.cStage.removeAllChildren();
                Canvas.cStage.update();

            } // End of if


            if (Canvas.isMobile) {
                createjs.Touch.enable(Canvas.cStage);
            }

            Canvas.cStage.enableMouseOver(10);

            // Set CreateJS Animiation Ticker
            createjs.Ticker.addEventListener('tick', Canvas.AnimationTicker);
            createjs.Ticker.setFPS(20);

        }, // End of initImage


        /**
         * Load Canvas Images
         * @param {array} Manifest - Manifest of Pictures
         * @return void
         */
        PreloadImages : function (Manifest) {

            if (typeof(Manifest) !== 'undefined') {
                Canvas.Manifest = Manifest;
            }

            if (typeof(Canvas.cPreload) === 'undefined') {
                Canvas.cPreload = new createjs.LoadQueue(false);
            }

            Canvas.cPreload.addEventListener("progress", Canvas.ImageProgress);
            Canvas.cPreload.addEventListener("fileload", Canvas.ImageLoading);
            Canvas.cPreload.addEventListener("complete", Canvas.LoadImageComplete);

            Canvas.cPreload.setMaxConnections(5);
            Canvas.cPreload.loadManifest(Canvas.Manifest);

        }, // End of PreloadImages


        /**
         * Init Process of load Image
         * that will trigger by laoding from image
         * @return void
         */
        ImageProgress : function (event) {
            //console.log('ImageProgress');
            //console.log(event.loaded);
        }, // End of ImageProgress


        /**
         * This function will be called when one image is loaded
         * @return void
         */
        ImageLoading : function (event) {

            Canvas.Pictures[event.item.id] = event.result;

        }, // End of imageLoaded


        /**
         * When all Images from Manifest are Loaded
         * then would this this funcion call onces
         * @return void
         */
        LoadImageComplete : function () {

            Canvas.LoadImage = true;

        }, // End of LoadImageComplete


        /**
         * CreateJS Animation Ticker Event
         * @return void
         */
        AnimationTicker : function () {

            Canvas.cStage.update();

        }, // End of animationTicker


        /**
         * Bind Drag Event for a CreateJS Element
         * @param {object} Object - CreateJS object
         * @return void
         */
        BindDragOnStage : function (Object) {

            // using "on" binds the listener to the scope of the currentTarget by default
            // in this case that means it executes in the scope of the button.
            Object.on("mousedown", function(evt) {
                this.parent.addChild(this);
                this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
            });

            // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
            Object.on("pressmove", function(evt) {
                this.x = evt.stageX + this.offset.x;
                this.y = evt.stageY + this.offset.y;
            });

        }, // End of BindDragOnStage


        /**
         * Set Click Event on an Object from the Stage
         * @param {object} Object - CreateJS object
         * @return void
         */
        BindClickOnElement : function (Object) {

            Object.on("click", function(evt) {
                Canvas.LastElement = Canvas.CurrentElement;
                Canvas.CurrentElement = this;
            }); // End of createjs.on

        } // End of BindClickOnElement

    }; // End of Canvas


    /**
     * Array Remove – By John Resig (MIT Licensed)
     * @param {object} from
     * @param {object} to
     * @return {array}
     */
    Array.prototype.remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };

})(window);