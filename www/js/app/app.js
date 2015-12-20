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
    'sky'
], function ($, THREE, camera, controls, geometry, lights, material, renderer, scene, loader, sky) {
    var initialize = function () {
        loader.loadModel();

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