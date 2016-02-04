define(["jquery", "three", "clock", "mesh"], function ($, THREE, clock, mesh) {

    var movingToPointer = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.5), new THREE.MeshLambertMaterial({color: 0xfff000}));
    //movingToPointer.position.y += 1.14;
    mesh.set("moving to","utils", movingToPointer);

    var movements = [];
    var movingTo;
    var movementSpeed = 9; //per second

    var addMovement = function (movement, fast) {
        fast = (fast == undefined ? false : fast);

        if(fast){
            movements = [];
            movingTo = undefined;
        }

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
        addMovement(newPosition,true);
    };

    var movementEquals = function (position) {
        return movingTo.equals(position);
    };

    //Todo: better return types?
    var getNextMovement = function (currentPosition) {
        if (movingTo != undefined && !movementEquals(currentPosition)) {
            return getNewPosition(clock.getDelta(), currentPosition);
        } else if (movements.length > 0) {
            clock.start();
            movingTo = movements.shift();
            movingToPointer.visible = true;
            movingToPointer.position.copy(movingTo);
            movingToPointer.position.y -= 0.86;
            return true;
        }else{
            //Todo: fire only once?
            movingToPointer.visible = false;
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