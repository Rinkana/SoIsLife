define(["three", "scene"], function (THREE, scene) {
    //var ambient = new THREE.AmbientLight(0xffffff);
    //scene.add(ambient);

    var hemisphere = new THREE.HemisphereLight( 0xffffff, 0xffffff, 10 );
    //hemisphere.color.setRGB( 153, 191, 127 );
    //hemisphere.groundColor.setRGB( 24, 127, 127 );
    hemisphere.position.set( 0, 5000, 0 );
    scene.add( hemisphere );

    var light = new THREE.DirectionalLight(0xffffff);
    //light.position.set(-19, 26, 55);
    light.position.set(75 * 100, 65 * 100, -75 * 100);
    light.intensity = 1;

    light.castShadow = true;
    light.shadowCameraNear = 0;
    light.shadowCameraFar = 20000;
    light.shadowDarkness = 0.5;
    light.shadowCameraRight = 10000;
    light.shadowCameraLeft = -10000;
    light.shadowCameraTop = 9000;
    light.shadowCameraBottom = -1000;
    light.shadowBias = 0.0001;
    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;

    scene.add(light);


    return {
        hemisphere:hemisphere,
        main:light
    };
});