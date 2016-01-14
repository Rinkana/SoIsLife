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
        var meshName = "floor-" + x + "-" + z;

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

    var createTileFromArray = function (x,y,terrain) {
        var geometry = new THREE.Geometry(),
            width = (terrain[0].length / 2) - 1,//Todo: use config vars?
            height = (terrain.length / 2) - 1,
            faceCounter = 0,
            squareSize = 1;

        var vector1,
            vector2,
            vector3,
            face;

        for (var wPos = -width; wPos < width; wPos++) {
            for (var hPos = -height; hPos < height; hPos++) {
                var faceIndex = faceCounter * 6;//Matrix 6
                var faceData = [
                    terrain[hPos + height][ wPos + width] * squareSize / 3,
                    terrain[hPos + height][ wPos + 1 + width] * squareSize / 3,
                    terrain[hPos + 1 + height][ wPos + width] * squareSize / 3,
                    terrain[hPos + 1 + height][ wPos + 1 + width] * squareSize / 3
                ];

                //Triangle 1
                vector1 = new THREE.Vector3(wPos * squareSize, faceData[0], (-1 * hPos) * squareSize);
                vector2 = new THREE.Vector3((wPos + 1) * squareSize, faceData[1], (-1 * hPos) * squareSize);
                vector3 = new THREE.Vector3(wPos * squareSize, faceData[2], (-1 + (-1 * hPos)) * squareSize);
                geometry.vertices.push(vector1,vector2,vector3);

                face = new THREE.Face3(faceIndex,faceIndex + 1, faceIndex + 2);
                face.normal = calculateFaceNormals(vector1,vector2,vector3);
                geometry.faces.push(face);

                //Triangle 2
                vector1 = new THREE.Vector3((wPos + 1) * squareSize, faceData[1], (-1 * hPos) * squareSize);
                vector2 = new THREE.Vector3((wPos + 1) * squareSize, faceData[3], (-1 +(-1 * hPos)) * squareSize);
                vector3 = new THREE.Vector3(wPos * squareSize, faceData[2], (-1 + (-1 * hPos)) * squareSize);
                geometry.vertices.push(vector1,vector2,vector3);

                face = new THREE.Face3(faceIndex + 3,faceIndex + 4, faceIndex + 5);
                face.normal = calculateFaceNormals(vector1,vector2,vector3);
                geometry.faces.push(face);

                faceCounter++;
            }
        }

        return createTile(x,y,geometry);

    };

    var calculateFaceNormals = function(vector1,vector2,vector3){
        var vx = (vector1.y - vector3.y) * (vector2.z - vector3.z) - (vector1.z - vector3.z) * (vector2.y - vector3.y);
        var vy = (vector1.z - vector3.z) * (vector2.x - vector3.x) - (vector1.x - vector3.x) * (vector2.z - vector3.z);
        var vz = (vector1.x - vector3.x) * (vector2.y - vector3.y) - (vector1.y - vector3.y) * (vector2.x - vector3.x);
        var va = Math.sqrt( Math.pow(vx,2) +Math.pow(vy,2)+Math.pow(vz,2));
        return new THREE.Vector3( vx/va, vy/va, vz/va);
    };

    var createRandomTile = function(x,z){
        var terrainArray = [];

        //add to extra because the array is made by vertex. Where the config is per face
        for(var wPos = 0; wPos < config.tileSize + 2; wPos++){
            var row = [];
            for(var hPos = 0; hPos < config.tileSize + 2; hPos++){
                row.push(Math.floor(Math.random()*(1 - -1 + 1 ) + -1));
            }
            terrainArray.push(row);
        }

        return createTileFromArray(x,z,terrainArray);
    };

    var buildTileRadius = function(playerInfo){
        for(var xCounter = playerInfo.visibleRadiusStart.x; xCounter <= playerInfo.visibleRadiusEnd.x; xCounter++){
            for(var zCounter = playerInfo.visibleRadiusStart.z; zCounter <= playerInfo.visibleRadiusEnd.z; zCounter++){
                var meshName = "floor-"+xCounter+"-"+zCounter;

                var foundMesh = mesh.get(meshName);
                if(typeof foundMesh == "undefined"){
                    createRandomTile(xCounter,zCounter)
                }else if(foundMesh instanceof THREE.Mesh){
                    foundMesh.visible = true;
                }

            }
        }
    };

    return {
        createTile: createTile,
        loadTile: loadTile,
        updateTerrain: updateTerrain,
        createTileFromArray:createTileFromArray,
        createRandomTile:createRandomTile,
        buildTileRadius:buildTileRadius
    };

});