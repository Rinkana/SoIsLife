define(["jquery","three","clock","container","raycaster"],function($,THREE,clock,container,raycaster){

    var movements = [];
    var movingTo = new THREE.Vector3();
    var movementSpeed = 5; //per second

    var containerSize = container.getContainerSize();
    var mouseVector = new THREE.Vector2();

    var addMovement = function(movement){
        movements.push(movement);
    };

    var getNewPosition = function(delta,currentPosition){

        var newPositions = {
            x:0,
            y:0,
            z:0
        };

        if (movingTo.x.toFixed(3) != currentPosition.x.toFixed(3)) {
            newPositions.x = parseFloat(((movingTo.x - currentPosition.x) < 0 ? -(movementSpeed * delta) : (movementSpeed * delta)).toFixed(1));
            //player.position.x += moveX;
            //camera.position.x += moveX;
        }
        if (movingTo.y.toFixed(3) != currentPosition.y.toFixed(3)) {
            newPositions.y = parseFloat(((movingTo.y - currentPosition.y) < 0 ? -(movementSpeed * delta) : (movementSpeed * delta)).toFixed(1));
            //player.position.y += moveY;
            //camera.position.y += moveY;
        }
        if (movingTo.z.toFixed(3) != currentPosition.z.toFixed(3)) {
            newPositions.z = parseFloat(((movingTo.z - currentPosition.z) < 0 ? -(movementSpeed * delta) : (movementSpeed * delta)).toFixed(1));
            //player.position.z += moveZ;
            //camera.position.z += moveZ;
        }

        return newPositions;

    };

    var calculateNewPosition = function(x,y){
        var position = [( x - containerSize.left ) / containerSize.width, ( y - containerSize.top ) / containerSize.height];
        mouseVector.fromArray(position);
        mouseVector.set(( mouseVector.x * 2 ) - 1, -( mouseVector.y * 2 ) + 1);

        var intersects = raycaster.intersectByVector(mouseVector);
        if (intersects.length > 0) {
            var intersect = intersects[0];

            var newPosition = intersect.object.geometry.vertices[intersect.face.a].clone();
            newPosition.applyMatrix4(intersect.object.matrixWorld);
            newPosition.x = intersect.point.x + intersect.face.normal.x;
            newPosition.z = intersect.point.z + intersect.face.normal.z;
            newPosition.divideScalar(1).floor().multiplyScalar(1).addScalar(0.5);
            newPosition.y = parseFloat((newPosition.y + 0.5).toFixed(2)); //Otherwise the clock will cause issues.
            addMovement(newPosition);

        }
    };

    var movementEquals = function(position){
        return movingTo.equals(position);
    };

    //Todo: better return types?
    var getNextMovement = function(currentPosition){
        if(!movementEquals(currentPosition)){
            return getNewPosition(clock.getDelta(),currentPosition);
        }else if(movements.length > 0){
            clock.start();
            console.log("start");
            movingTo = movements.shift();
            return true;
        }

        return false;
    };

    return {
        getNewPosition:getNewPosition,
        addMovement:addMovement,
        movementEquals:movementEquals,
        getNextMovement:getNextMovement,
        calculateNewPosition:calculateNewPosition
    }

});