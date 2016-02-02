/**
 * Load the engine
 */
define(["jquery", "three", "container"], function ($, THREE, container) {
    var renderer = new THREE.WebGLRenderer({antialias: true});
    container.element.appendChild(renderer.domElement);
    renderer.setClearColor(0x000000);

    var updateSize = function () {
        renderer.setSize(container.element.offsetWidth, container.element.offsetHeight);
    };

    $(window).resize(updateSize);
    updateSize();

    return renderer;
});