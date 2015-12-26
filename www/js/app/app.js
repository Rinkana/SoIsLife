/**
 * Core application handling
 */
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
        //loader.loadModel("01",0,"01");
        //loader.loadModel("10",0,"01");
        //loader.loadModel("01",0,"10");
        //loader.loadModel("10",0,"10");
        //loader.loadModel(0,0,0);
        //loader.loadModel(0,0,1);
        //loader.loadModel("03",0,"03");
        //loader.loadModel(4,0,4);


        //loader.loadModel(0,0,30);

        var planeGeo = new THREE.PlaneGeometry(4096,4096);
        var plane = new THREE.Mesh(planeGeo,material.floor);
        plane.rotation.set(-Math.PI/2, Math.PI/2000, Math.PI);
        scene.add(plane);

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