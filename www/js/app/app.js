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
        lights.set("sun",new THREE.DirectionalLight(0xb3b3b3,1.5),true);
        lights.get("sun").position.y += 2000;

        texture.load("/images/heightmaps/terrain.png",function(){
            material.get("floor").map = texture.get("terrain");
        });

        //The terrain seems to have an positioning issue.
        //Todo: investigate
        //terrain.loadTile(0,0);

        var TerrainGeo = new THREE.TerrainGeometry([
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1]
        ],1);
        /*var TerrainBufferGeo = new THREE.TerrainBufferGeometry([
            [3, 2, 2, 5, 8],
            [2, 1, 2, 3, 6],
            [1, 1, 1, 2, 4],
            [1, 1, 1, 3, 4],
            [1, 1, 1, 4, 4]
        ],1);*/

        //var test = new THREE.Mesh(TerrainBufferGeo, material.get("floor"));

        //scene.add(test);

        //terrain.createRandomTile(0,0);
        //terrain.createRandomTile(0,0);
        //terrain.createTile(0,0);
        /**
         * [
         [3, 2, 2, 5, 8],
         [2, 1, 2, 3, 6],
         [1, 1, 1, 2, 4],
         [1, 1, 1, 3, 4],
         [1, 1, 1, 4, 4]
         ]
         */

        //terrain.createTile(5,5);
        //terrain.createTile(4,4);
        //terrain.createTile(3,3);
        //terrain.createTile(2,2);
        //terrain.createTile(1,1);
        //terrain.createTile(-5,-5);
        //terrain.createTile(-1,-1);
        //terrain.createTile(1,0.5).rotation.set(-Math.PI / 2, 0, Math.PI);
        //terrain.createTile(1,1.5).rotation.set(-Math.PI / 2, 0, Math.PI);
        //terrain.createTile(0,2).rotation.set(-Math.PI / 2, 0, Math.PI);
        terrain.load(0,0);
        setTimeout(function(){

            terrain.editTile(0,0);
        },500);

        player.init();

        scene.add(controls.transform);

        debug.enable();

    };

    var animate = function () {
        requestAnimationFrame( animate );
        player.move();
        controls.main.update();
        controls.transform.update();
        renderer.render(scene, camera);
    };

    return {
        initialize: initialize,
        animate: animate
    }
});