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
    'input',
    'clock',
    'utils',
    'config',
    'dat',
    'debug',
    'terrainEditor'
], function ($, THREE, loader, camera, controls, geometry, texture, lights, material, renderer, scene, mesh, raycaster, projector, terrain, player, input, clock, utils, config, dat, debug, terrainEditor) {
    var initialize = function () {

        lights.set("ambient", new THREE.AmbientLight(0x404040), true);
        lights.set("sun", new THREE.DirectionalLight(0xb3b3b3, 1.5), true);
        lights.get("sun").position.y += 2000;

        texture.load("/images/heightmaps/terrain.png", function () {
            material.get("floor").map = texture.get("terrain");
        });

        terrain.load(0, 0);

        setTimeout(function () {
            terrainEditor.edit(0, 0);
        }, 500);

        player.init();

        scene.add(controls.transform);

        debug.enable();

    };

    var animate = function () {
        requestAnimationFrame(animate);
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