/**
 * Load the engine
 */
define(["jquery", "babylon", "container"], function ($, BABYLON, container) {
    var engine = new BABYLON.Engine(container, true);

    var updateSize = function () {
        engine.resize();
    };

    $(window).resize(updateSize);
    updateSize();

    return engine;
});