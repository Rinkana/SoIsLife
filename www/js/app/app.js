define([
    'jquery',
    'three',
    'camera',
    'controls',
    'geometry',
    'lights',
    'material',
    'renderer',
    'scene',
    'loader',
    'sky',
    'debug'
], function ($, THREE, camera, controls, geometry, lights, material, renderer, scene, loader, sky, debug) {
    var initialize = function () {
        loader.loadModel();

        debug.enable();
    };

    var animate = function(){
        window.requestAnimationFrame( animate );
        controls.update();
        //controls.handlePosition();
        renderer.render( scene, camera );
    };

    return {
        initialize: initialize,
        animate:animate
    }
});