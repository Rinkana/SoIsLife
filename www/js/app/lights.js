define(["three", "scene"], function (THREE, scene) {
    var ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);

    var light = new THREE.DirectionalLight(0xffffff);
    //light.position.set(-19, 26, 55);
    light.position.set(75, 65, -75);
    light.shadowCameraNear = 0;
    light.intensity = 1;

    light.castShadow = true;
    light.shadowDarkness = 0.5;
    light.shadowCameraRight = 1000;
    light.shadowCameraLeft = -1000;
    light.shadowCameraTop = 1000;
    light.shadowCameraBottom = -1000;
    light.shadowBias = 0.0001;
    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;

    scene.add(light);


    return {
        ambient:ambient,
        main:light
    };
});