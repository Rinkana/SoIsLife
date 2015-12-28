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
    'sky',
    "mesh",
    'debug'
], function ($, THREE, loader, camera, controls, geometry, texture, lights, material, renderer, scene, sky, mesh, debug) {
    var initialize = function () {


        //Size of object = 30
        //Object will by a factor 50 making it 1500
        //loader.loadModel("01",0,"01");
        //loader.loadModel("10",0,"01");
        //loader.loadModel("01",0,"10");
        //loader.loadModel("10",0,"10");
        //loader.loadModel(0,0,0);
        //loader.loadModel(0,0,1);
        //loader.loadModel("03",0,"03");
        //loader.loadModel(4,0,4);


        //loader.loadModel(0,0,30);

        texture.load(["/images/heightmaps/terrain.png","/images/textures/grass.jpg"],function(){
            console.log(texture.get("grass"));
            var floorMaterial = material.floor;
            floorMaterial.displacementMap = texture.get("terrain");
            floorMaterial.displacementScale = 1024;
            var grassTexture = texture.get("grass");
            grassTexture.repeat.set( 20, 20 );
            grassTexture.wrapS = THREE.RepeatWrapping;
            grassTexture.wrapT = THREE.RepeatWrapping;
            floorMaterial.bumpMap = grassTexture;
            floorMaterial.map = grassTexture;
            //floorMaterial.wireframe = true;

            var planeGeo = new THREE.PlaneGeometry(8192, 8192,20,20);
            //console.log(planeGeo);
            var plane = new THREE.Mesh(planeGeo, floorMaterial);
            plane.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI);
            plane.position.y -= 500;
            scene.add(plane);
        });




        //debug.enable();
    };

    var animate = function () {
        window.requestAnimationFrame(animate);
        controls.update();
        //controls.handlePosition();
        renderer.render(scene, camera);
    };

    return {
        initialize: initialize,
        animate: animate
    }
});