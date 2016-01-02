/**
 * Setup the lights being used within this scene
 */
define(["three", "scene"], function (THREE, scene) {

    var ambient = new THREE.AmbientLight(0x404040);
    scene.add( ambient );

    var light = new THREE.DirectionalLight(0xffffff,1);
    light.position.y += 2000;

    scene.add( light );

    return {
        //hemisphere:hemisphere,
        ambient:ambient,
        main:light
    };
});