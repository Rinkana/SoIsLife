define(["three", "scene"], function (THREE, scene) {
    var ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(-19, 26, 55);
    light.castShadow = true;
    scene.add(light);

    var light2 = new THREE.DirectionalLight(0xffffff);
    light2.intensity = 0.5;
    light2.position.set(-30, 26, -90);
    light2.castShadow = true;
    scene.add(light2);

    return {
        ambient:ambient,
        main:light,
        helper:light2
    };
});