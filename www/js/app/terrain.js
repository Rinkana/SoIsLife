/**
 *
 *
 */
define(["three","mesh","geometry","material","scene", "config"],function(THREE,mesh,geometry,material,scene,config){

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

    var createTile = function(x,z){
        var meshName = "floor-"+x+"-"+z;
        var planeGeo = new THREE.PlaneGeometry(config.tileSize, config.tileSize, config.tileSize, config.tileSize);
        var plane = new THREE.Mesh(planeGeo, material.get("floor"));
        plane.castShadow = true;
        plane.receiveShadow = true;
        plane.rotation.set(-Math.PI / 2, 0, Math.PI);
        plane.position.x = x * config.tileSize;
        plane.position.y -= -1;
        plane.position.z = z * config.tileSize;


        mesh.set(meshName,plane);

        scene.add(mesh.get(meshName));
    };

    return {
        createTile:createTile
    };

});