
define(["three","jquery","container","position","terrainEditor","raycaster","mesh"],function(THREE,$,container,position,terrainEditor,raycaster,mesh){

    var mousePos = {
        x:0,
        y:0
    };

    var containerSize = container.getContainerSize();
    var mouseVector = new THREE.Vector2();

    var getClickedObject = function(x,y){
        var clickPosition = [( x - containerSize.left ) / containerSize.width, ( y - containerSize.top ) / containerSize.height];
        mouseVector.fromArray(clickPosition);
        mouseVector.set(( mouseVector.x * 2 ) - 1, -( mouseVector.y * 2 ) + 1);

        var intersects = raycaster.intersectByVector(mouseVector, mesh.getArray());

        if (intersects.length > 0) {
            var intersect = intersects[0];

            if (intersect.object.geometry.type == "TerrainGeometry") {
                position.calculateNewPosition(intersect);
            }else if(intersect.object.geometry.type == "BoxGeometry"){
                terrainEditor.setEditVertex(intersect.object);
            }
        }
    };

    $(container.element).on("mousedown touchstart", function (event) {
        event.preventDefault();
        mousePos.x = event.clientX;
        mousePos.y = event.clientY;
    }).on("mouseup touchend", function (event) {
        event.preventDefault();
        if (Math.abs(mousePos.x - event.clientX) <= 5 && Math.abs(mousePos.y - event.clientY) <= 5) {
            getClickedObject(event.clientX, event.clientY);
        }
    });


    return {
    };
});