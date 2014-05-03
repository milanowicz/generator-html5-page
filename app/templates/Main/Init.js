/**
 * Init Main JavaScript Object
 */
if (typeof(jQuery) === 'undefined') {
    console.log('jQuery Framework is required!');
} else if (typeof(createjs) === 'undefined') {
    console.log('CreateJS Framework is required!');
} else {

    $(document).ready(Main.init);

} // End of if