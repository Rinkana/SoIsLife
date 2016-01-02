/**
 * Setup the lights being used within this scene
 */
define(["three", "scene"], function (THREE, scene) {

    var light = new THREE.AmbientLight(0x404040);
    scene.add( light );

    return {
        //hemisphere:hemisphere,
        main:light
    };
});