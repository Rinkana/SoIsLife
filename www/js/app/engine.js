/**
 * Load the engine
 */
define(["jquery", "babylon", "container"], function ($, BABYLON, container) {
    var engine = new BABYLON.Engine(container, true);

    var updateSize = function () {
    };

    $(window).resize(updateSize);
    updateSize();

    return engine;
});