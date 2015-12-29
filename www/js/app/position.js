define(["jquery","three","projector","raycaster","container","debug"],function($,THREE,projector,raycaster,container,debug){

    //var mousePosition = { x: 0, y: 0 };
    var mouseVector = new THREE.Vector2();
    var newPosition = false;
    var containerSize = container.getBoundingClientRect();

    $(container).on("click",function(event){
        newPosition = true;
        var position = [( event.clientX - containerSize.left ) / containerSize.width, ( event.clientY - containerSize.top ) / containerSize.height];
        mouseVector.fromArray(position);
        mouseVector.set(( mouseVector.x * 2 ) - 1, -( mouseVector.y * 2 ) + 1);

    });

    var updateContainerSize = function(){
        containerSize = container.getBoundingClientRect();
    };

    var move = function(){
        if(newPosition){
            var intersects = raycaster.intersectByVector(mouseVector);
            if(intersects.length > 0){

                debug.addMarker(intersects[0].point.x,intersects[0].point.y,intersects[0].point.z);
                intersects[0].face.color = new THREE.Color(0x000000);
                intersects[0].object.geometry.colorsNeedUpdate = true;
                console.log(intersects[0]);
            }
            newPosition = false;
        }
    };

    return {
        updateContainerSize: updateContainerSize,
        move:move
    }

});