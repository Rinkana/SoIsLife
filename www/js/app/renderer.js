/**
 * Load the engine
 */
define(["jquery", "three", "container"], function ($, THREE, container) {
    var renderer = new THREE.WebGLRenderer({antialias: true});
    container.appendChild(renderer.domElement);

    var updateSize = function () {
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    };

    $(window).resize(updateSize);
    updateSize();

    return renderer;
});