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
        //Size of object = 30
        //Object will by a factor 50 making it 1500
        loader.loadModel(0,-100,0);
        loader.loadModel(1500,-100,0);

        loader.loadModel(0,-100,1500);

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