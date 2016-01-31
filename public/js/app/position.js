define(["jquery", "three", "clock"], function ($, THREE, clock) {

    var movements = [];
    var movingTo = new THREE.Vector3();
    var movementSpeed = 5; //per second

    var addMovement = function (movement) {
        movements.push(movement);
    };

    var getNewPosition = function (delta, currentPosition) {

        var newPositions = {
            x: 0,
            y: 0,
            z: 0
        };

        var movementAddition = movementSpeed * delta;

        if (movingTo.x != currentPosition.x) {
            if( Math.abs(movingTo.x - currentPosition.x) > movementAddition) {
                newPositions.x = ((movingTo.x - currentPosition.x) < 0 ? -movementAddition : movementAddition);
            }else{
                newPositions.x = (movingTo.x - currentPosition.x);
            }
        }
        if (movingTo.y != currentPosition.y) {
            if( Math.abs(movingTo.y - currentPosition.y) > movementAddition) {
                newPositions.y = ((movingTo.y - currentPosition.y) < 0 ? -movementAddition : movementAddition);
            }else{
                newPositions.y = (movingTo.y - currentPosition.y);
            }
        }
        if (movingTo.z != currentPosition.z) {
            if( Math.abs(movingTo.z - currentPosition.z) > movementAddition) {
                newPositions.z = ((movingTo.z - currentPosition.z) < 0 ? -movementAddition : movementAddition);
            }else{
                newPositions.z = (movingTo.z - currentPosition.z);
            }
        }

        return newPositions;

    };

    var calculateNewPosition = function(intersect){
        console.log(intersect);
        var newPosition = intersect.point.clone();
        //var newPosition = intersect.object.geometry.vertices[intersect.face.a].clone();
        //Todo: do i need this?
        //newPosition.applyMatrix4(intersect.object.matrixWorld);
        //newPosition.add(intersect.face.normal);
        newPosition.y += 1;
        console.log(newPosition);
        addMovement(newPosition);
    };

    var movementEquals = function (position) {
        return movingTo.equals(position);
    };

    //Todo: better return types?
    var getNextMovement = function (currentPosition) {
        if (!movementEquals(currentPosition)) {
            return getNewPosition(clock.getDelta(), currentPosition);
        } else if (movements.length > 0) {
            clock.start();
            movingTo = movements.shift();
            return true;
        }

        return false;
    };

    return {
        getNewPosition: getNewPosition,
        addMovement: addMovement,
        movementEquals: movementEquals,
        getNextMovement: getNextMovement,
        calculateNewPosition: calculateNewPosition
    }

});