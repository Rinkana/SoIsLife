/**
 * Load the renderer
 */
define(["jquery", "three", "container"], function ($, THREE, container) {
    var renderer = new THREE.WebGLRenderer({antialias: true});
    container.appendChild(renderer.domElement);

    var updateSize = function () {
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    };

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    $(window).resize(updateSize);
    updateSize();

    return renderer;
});