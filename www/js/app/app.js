/**
 * Core application handling
 */
define([
    'jquery',
    'babylon',
    'container',
    'scene',
    'camera',
    'lights',
    'material',
    'texture',
    'geometry',
    'engine',
    'debug'
], function ($, BABYLON, container, scene, camera, lights, material, texture, geometry ,engine, debug) {
    var initialize = function () {

        geometry.set("sphere", BABYLON.Mesh.CreateSphere("sphere", 16, 2, scene));
        geometry.set("ground", BABYLON.Mesh.CreateGround("ground",6,6,2,scene));
        material.set("floor", new BABYLON.StandardMaterial("floor", scene));
        texture.load("/images/textures/grass.jpg");

        geometry.get("sphere").position.y = 1;
        geometry.get("sphere").material = material.get("floor");
        geometry.get("ground").material = material.get("floor");
        material.get("floor").diffuseColor = new BABYLON.Color3(0,1.5,0);
        material.get("floor").diffuseTexture = texture.get("grass");

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
/*
        texture.load(["/images/heightmaps/terrain.png","/images/textures/grass.jpg"],function(){
            console.log(texture.get("grass"));
            var floorMaterial = material.floor;
            floorMaterial.displacementMap = texture.get("terrain");
            floorMaterial.displacementScale = 1024;
            var grassTexture = texture.get("grass");
            grassTexture.repeat.set( 20, 20 );
            grassTexture.wrapS = THREE.RepeatWrapping;
            grassTexture.wrapT = THREE.RepeatWrapping;
            //floorMaterial.bumpMap = grassTexture;
            //floorMaterial.map = grassTexture;
            //floorMaterial.wireframe = true;

            var planeGeo = new THREE.PlaneGeometry(8192, 8192,20,20);
            planeGeo.computeVertexNormals();
            //console.log(planeGeo);
            var plane = new THREE.Mesh(planeGeo, floorMaterial);
            plane.castShadow = true;
            plane.receiveShadow = true;
            plane.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI);
            plane.position.y -= 500;

            mesh.set("floor",plane);

            scene.add(mesh.get("floor"));
        });*/

        //debug.enable();

        engine.runRenderLoop(renderLoop);
    };

    var renderLoop = function () {
        scene.render();
        /*
        window.requestAnimationFrame(animate);
        controls.update();
        position.move();
        //controls.handlePosition();
        renderer.render(scene, camera);*/
    };

    return {
        initialize: initialize,
        renderLoop: renderLoop
    }
});