define(["three", "camera", "container", "mesh", "controls"], function (THREE, camera, container, mesh, controls) {

    var activeEdit;
    var editTimeout;

    var edit = function (x, z) {
        var meshName = x + "|" + z;
        var meshTile = mesh.get(meshName, "floor");
        meshTile.geometry.dynamic = true;

        var boxGeo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        var boxMat = new THREE.MeshBasicMaterial(0x00ff00);

        var width = (meshTile.geometry.terrainWidth / 2) - 0.5,
            depth = (meshTile.geometry.terrainDepth / 2) - 0.5;

        //for(var zPos = -(meshTile.geometry.terrainWidth))

        for (var zPos = -depth; zPos <= depth; zPos++) {
            for (var xPos = -width; xPos <= width; xPos++) {
                var boxName = meshName + "," + xPos + "|" + zPos;
                var boxMesh = new THREE.Mesh(boxGeo, boxMat);
                var height = meshTile.geometry.points[zPos + depth][xPos + width] * meshTile.geometry.size / 3 + 1;

                boxMesh.position.set(xPos, height, zPos);
                boxMesh.name = boxName;
                mesh.set(boxName, "debug", boxMesh);
            }
        }
    };

    //Todo: what the fuck is this for name? Find a better one.
    var setEditVertex = function (box) {
        if(activeEdit != undefined){
            controls.transform.detach(box);
            activeEdit = undefined;
        }

        activeEdit = box;
        controls.transform.attach(box);
    };

    var editMade = function(){
        var positionData = activeEdit.name.split(",");
        var activeTile = positionData[0],
            activeVertex = positionData[1].split("|");

        var newVertexValue = activeEdit.position.y - 1;

        var tile = mesh.get(activeTile,"floor");
        //tile.points[activeVertex[0],activeVertex[1]] = newVertexValue;
        //console.log( parseInt(activeVertex[0]) + 32, parseInt(activeVertex[1]) + 32 );
        //console.log(positionData,activeTile,activeVertex);

        tile.geometry.points[parseInt(activeVertex[0]) + 32][parseInt(activeVertex[1]) + 32] = newVertexValue;
        tile.geometry.calculatePoints();
        tile.geometry.verticesNeedUpdate = true;
        //console.log();
        //tile.geometry.groupsNeedUpdate = true;
        //tile.geometry.elementsNeedUpdate = true;

    };

    controls.transform.addEventListener("objectChange",function(){
        clearTimeout(editTimeout);
        editTimeout = setTimeout(editMade,50);
    });

    return {
        edit: edit,
        setEditVertex: setEditVertex
    };
});