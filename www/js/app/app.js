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
    'utils',
    'debug'
], function ($, THREE, loader, camera, controls, geometry, texture, lights, material, renderer, scene, mesh, raycaster, projector, position, utils, debug) {
    var initialize = function () {

        material.set("floor", new THREE.MeshPhongMaterial({
            color: 0x2786b6,//0x000000
            emissive: 0xffffff,//0xFF8040
            specular: 0xffffff,
            shading: THREE.FlatShading,
            vertexColors: THREE.FaceColors,
            shininess: 1,
            side: THREE.FrontSide
        }));

        var planeGeo = new THREE.PlaneGeometry(8192, 8192,20,20);
        planeGeo.computeVertexNormals();
        //console.log(planeGeo);
        var plane = new THREE.Mesh(planeGeo, material.get("floor"));
        plane.castShadow = true;
        plane.receiveShadow = true;
        plane.rotation.set(-Math.PI / 2, Math.PI / 2000, Math.PI);
        plane.position.y -= -1;

        mesh.set("floor",plane);

        scene.add(mesh.get("floor"));

        //geometry.set("sphere", BABYLON.Mesh.CreateSphere("sphere", 16, 2, scene));
        //geometry.set("ground", BABYLON.Mesh.CreateGroundFromHeightMap("ground", "/images/heightmaps/terrain4.png", 2000, 2000, 500, 0, 40, scene, false));
        //geometry.set("water", BABYLON.Mesh.CreatePlane("water", 2000, scene));
        //material.set("floor", new BABYLON.StandardMaterial("floor", scene));
        //material.set("water", new BABYLON.StandardMaterial("water", scene));
        //texture.load("/images/textures/grass.jpg");
        //texture.load("/images/heightmaps/terrain.png");


        //material.get("floor").diffuseTexture = texture.get("grass");
        //material.get("floor").diffuseTexture.uScale = 100.0;
        //material.get("floor").diffuseTexture.vScale = 100.0;
        //material.get("floor").wireframe = true;
        //material.get("floor").diffuseColor = new BABYLON.Color3.FromInts(18,41,5);
        //material.get("floor").specularColor = new BABYLON.Color3.FromInts(25,25,25);
        //material.get("floor").specularPower = 100;

        //material.get("water").diffuseColor = new BABYLON.Color3.FromInts(10,110,140);
        //material.get("floor").specularColor = utils.RGBColor(41,144,179);
        //material.get("water").specularPower = 100;

        //geometry.get("water").rotation.x= Math.PI / 2;
        //geometry.get("water").position.y -= 1;
        //geometry.get("sphere").position.y = 1;
        //geometry.get("sphere").material = material.get("floor");
        //geometry.get("ground").material = material.get("floor");
        //geometry.get("water").material = material.get("water");
        //geometry.get("ground").position.y -= 27;
        //geometry.get("ground").receiveShadow = true;
        //console.log(geometry.get("ground"));
        //geometry.get("water").convertToFlatShadedMesh();
        //geometry.get("ground").applyDisplacementMap("/images/heightmaps/terrain.png",0,10);
        //material.get("floor").diffuseColor = new BABYLON.Color3(0,1.5,0);


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