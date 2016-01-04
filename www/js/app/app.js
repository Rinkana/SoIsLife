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
    'position',
    'player',
    'utils',
    'dat',
    'debug'
], function ($, THREE, loader, camera, controls, geometry, texture, lights, material, renderer, scene, mesh, raycaster, projector, position, player, utils, dat, debug) {
    var initialize = function () {

        lights.set("ambient",new THREE.AmbientLight(0x404040),true);
        lights.set("sun",new THREE.DirectionalLight(0xffffff,1),true);
        lights.get("sun").position.y += 2000;

        material.set("floor", new THREE.MeshPhongMaterial({
            color: 0x06330F,//0x000000
            emissive: 0x06330F,//0xFF8040
            specular: 0xffffff,
            shading: THREE.FlatShading,
            vertexColors: THREE.FaceColors,
            shininess: 1,
            side: THREE.FrontSide,
            wireframe:true
        }));

        var planeGeo = new THREE.PlaneBufferGeometry(1000, 1000, 100,100);
        var plane = new THREE.Mesh(planeGeo, material.get("floor"));
        plane.castShadow = true;
        plane.receiveShadow = true;
        plane.rotation.set(-Math.PI / 2, 0, Math.PI);
        plane.position.y -= -1;

        mesh.set("floor",plane);

        scene.add(mesh.get("floor"));

        debug.enable();

    };

    var animate = function () {
        requestAnimationFrame( animate );
        controls.update();
        renderer.render(scene, camera);
    };

    return {
        initialize: initialize,
        animate: animate
    }
});