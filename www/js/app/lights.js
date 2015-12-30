/**
 * Setup the lights being used within this scene
 */
define(["babylon", "scene"], function (BABYLON, scene) {

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0,1,0), scene);

    return {
        //hemisphere:hemisphere,
        main:light
    };
});