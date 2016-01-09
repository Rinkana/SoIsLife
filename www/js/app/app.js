/**
 * Core application handling
 */
define([
    'jquery',
    'three',
    'loader',
    'camera',
    'controls',
    'geometry',
    'texture',
    'lights',
    'material',
    'renderer',
    'scene',
    'mesh',
    'raycaster',
    'projector',
    'terrain',
    'player',
    'clock',
    'utils',
    'config',
    'dat',
    'debug'
], function ($, THREE, loader, camera, controls, geometry, texture, lights, material, renderer, scene, mesh, raycaster, projector, terrain, player, clock, utils,config ,dat, debug) {
    var initialize = function () {

        lights.set("ambient",new THREE.AmbientLight(0x404040),true);
        lights.set("sun",new THREE.DirectionalLight(0xffffff,1),true);
        lights.get("sun").position.y += 2000;

        texture.load("/images/heightmaps/terrain.png",function(){
            material.get("floor").map = texture.get("terrain");
        });

        terrain.loadTile(0,0);

        //terrain.createTile(0,0);
        terrain.createTile(1,0.5).rotation.set(-Math.PI / 2, 0, Math.PI);
        terrain.createTile(1,1.5).rotation.set(-Math.PI / 2, 0, Math.PI);
        terrain.createTile(0,2).rotation.set(-Math.PI / 2, 0, Math.PI);


        player.init();

        debug.enable();

    };

    var animate = function () {
        requestAnimationFrame( animate );
        player.move();
        controls.update();
        renderer.render(scene, camera);
    };

    return {
        initialize: initialize,
        animate: animate
    }
});