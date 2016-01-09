/**
 *
 *
 */
define(["three", "mesh", "geometry", "material", "scene", "config", "loader"], function (THREE, mesh, geometry, material, scene, config, loader) {

    material.set("floor", new THREE.MeshPhongMaterial({
        color: 0x06330F,//0x000000
        emissive: 0x06330F,//0xFF8040
        specular: 0xffffff,
        shading: THREE.FlatShading,
        vertexColors: THREE.FaceColors,
        shininess: 1,
        side: THREE.FrontSide,
        wireframe: true
    }));

    var createTile = function (x, z, geometry) {
        var meshName = "floor-" + x + "-" + z;

        if (typeof geometry == "undefined") {
            geometry = new THREE.PlaneGeometry(config.tileSize, config.tileSize, config.tileSize, config.tileSize);
        }

        var plane = new THREE.Mesh(geometry, material.get("floor"));
        plane.castShadow = true;
        plane.receiveShadow = true;

        plane.position.x = x * config.tileSize;
        plane.position.y -= -1;
        plane.position.z = z * config.tileSize;


        mesh.set(meshName, plane);

        scene.add(mesh.get(meshName));

        return mesh.get(meshName);
    };

    var loadTile = function (x, z) {
        var filename = (x >= 0 ? "p" : "n") + x + "-" + (z >= 0 ? "p" : "n") + z + ".js";
        loader.modelLoader.load("/models/"+filename,function (geometry) {
            createTile(x,z,geometry);
        });
    };

    var load = function (tiles, callback) {

    };

    return {
        createTile: createTile,
        loadTile:loadTile
    };

});