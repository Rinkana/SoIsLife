define(["three","camera","container","mesh","controls"],function(THREE,camera,container,mesh,controls){

    var edit = function(x,z){
        var meshName =  x + "|" + z;
        var meshTile = mesh.get(meshName,"floor");

        var boxGeo = new THREE.BoxGeometry(0.1,0.1,0.1);
        var boxMat = new THREE.MeshBasicMaterial(0x00ff00);

        var width = (meshTile.geometry.terrainWidth / 2) - 0.5,
            depth = (meshTile.geometry.terrainDepth / 2) - 0.5;

        //for(var zPos = -(meshTile.geometry.terrainWidth))

        for(var zPos = -depth; zPos <= depth; zPos++){
            for(var xPos = -width; xPos <= width; xPos++){
                var boxName = xPos + "|" + zPos;
                var boxMesh = new THREE.Mesh(boxGeo,boxMat);
                var height = meshTile.geometry.points[zPos + depth][xPos + width] * meshTile.geometry.size / 3 + 1;

                boxMesh.position.set(xPos,height,zPos);
                mesh.set(boxName,"debug",boxMesh);
            }
        }
    };

    //Todo: what the fuck is this for name? Find a better one.
    var setEditVertex = function(box){
        controls.transform.attach(box);
    };

    return {
        edit:edit,
        setEditVertex:setEditVertex
    };
});