define(["three","scene"],function(THREE,scene){
    var sky = new THREE.Sky();
    scene.add(sky.mesh);

    var distance = 40000;

    var inclination = 0.33,
        azimuth = 0.33;

    var theta = Math.PI * (inclination - 0.5),
        phi = 2 * Math.PI * (azimuth - 0.5);

    var uniforms = sky.uniforms;
    uniforms.turbidity.value = 10;
    uniforms.reileigh.value = 2;
    uniforms.luminance.value = 1.1;
    uniforms.mieCoefficient.value = 0.003;
    uniforms.mieDirectionalG.value = 0.8;
    uniforms.sunPosition.value.x = distance * Math.cos(phi);
    uniforms.sunPosition.value.y = distance * Math.sin(phi) * Math.sin(theta);
    uniforms.sunPosition.value.z = distance * Math.sin(phi) * Math.cos(theta);


    return sky;
});