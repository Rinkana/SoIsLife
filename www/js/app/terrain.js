/**
 *
 *
 */
define(["three", "mesh", "geometry", "material", "scene", "config", "loader"], function (THREE, mesh, geometry, material, scene, config, loader) {

    material.set("floor", new THREE.MeshPhongMaterial({
        color: 0x06330F,//0x000000
        emissive: 0x06330F,//0xFF8040
        specular: 0x525252,
        shading: THREE.FlatShading,
        vertexColors: THREE.FaceColors,
        shininess: 3,
        side: THREE.FrontSide,
        wireframe: true
    }));

    var createTile = function (x, z, geometry) {
        var meshName = "floor-" + x + "/" + z;

        var plane;
        if (typeof geometry == "undefined") {
            geometry = new THREE.PlaneGeometry(config.tileSize, config.tileSize, config.tileSize, config.tileSize);
            plane = new THREE.Mesh(geometry, material.get("floor"));
            plane.rotateX(-Math.PI / 2);
            plane.rotateZ(Math.PI / 2);
        } else {
            plane = new THREE.Mesh(geometry, material.get("floor"));
        }

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
        loader.modelLoader.load("/models/" + filename, function (geometry) {
            createTile(x, z, geometry);
        });
    };

    var load = function (tiles, callback) {

    };

    var updateTerrain = function (playerPosition) {

    };

    var createRandomTile = function (x, z) {
        var terrainArray = [];

        //add to extra because the array is made by vertex. Where the config is per face
        for (var wPos = 0; wPos < config.tileSize + 2; wPos++) {
            var row = [];
            for (var hPos = 0; hPos < config.tileSize + 2; hPos++) {
                row.push(Math.floor(Math.random() * (1 - -1 + 1 ) + -1));
            }
            terrainArray.push(row);
        }

        var geo = new THREE.TerrainGeometry(terrainArray);

        return createTile(x, z, geo);
    };

    //Todo: much refactoring....
    var cleanTerrainCache = function (radius) {
        for (var meshName in mesh.get()) {
            if (!mesh.get().hasOwnProperty(meshName)) continue;
            var meshPosition = meshName.replace("floor-", "").split("/");

            if (meshPosition.length == 2) {
                if ( radius.start.x > meshPosition[0] ||
                     radius.start.z > meshPosition[1] ||
                     radius.end.x < meshPosition[0] ||
                     radius.end.z < meshPosition[1]
                ) {
                    console.log("RM" + meshName);
                    //mesh.get(meshName).material = new THREE.MeshBasicMaterial( { color: 0xffaa00, wireframe: false } );
                    scene.remove(mesh.get(meshName));
                    mesh.remove(meshName);
                }else{
                    mesh.visible = false;
                }
            }

        }
    };

    var buildTileRadius = function (playerInfo) {
        cleanTerrainCache(playerInfo.bufferRadius);

        for (var xCounter = playerInfo.visibleRadius.start.x; xCounter <= playerInfo.visibleRadius.end.x; xCounter++) {
            for (var zCounter = playerInfo.visibleRadius.start.z; zCounter <= playerInfo.visibleRadius.end.z; zCounter++) {
                var meshName = "floor-" + xCounter + "/" + zCounter;

                var foundMesh = mesh.get(meshName);
                if (typeof foundMesh == "undefined") {
                    createRandomTile(xCounter, zCounter)
                } else if (foundMesh instanceof THREE.Mesh) {
                    foundMesh.visible = true;
                }

            }
        }
    };

    return {
        createTile: createTile,
        loadTile: loadTile,
        updateTerrain: updateTerrain,
        createRandomTile: createRandomTile,
        buildTileRadius: buildTileRadius
    };

});