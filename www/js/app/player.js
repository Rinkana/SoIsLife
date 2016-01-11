/**
 * Load the engine
 */
define(["jquery", "container", "three", "controls", "scene", "raycaster", "clock", "camera", "config"], function ($, container, THREE, controls, scene, raycaster, clock, camera, config) {
    var player = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), new THREE.MeshLambertMaterial({color: 0xff0000}));
    var mouseVector = new THREE.Vector2();
    var containerSize = container.getBoundingClientRect();

    var movements = [];
    var moveTo = new THREE.Vector3();

    moveTo = player.position;
    player.position.y += 2;
    scene.add(player);


    var movementSpeed = 5; //per second

    var init = function () {

    };

    var updateCamera = function () {

        controls.target.copy(player.position);

    };

    //Todo:Off by one
    //Todo: Really? you can do better then this....
    var getPlayerInfo = function () {
        console.log(player.position);
        return {
            currentTile: {
                x: Math.floor(player.position.x / (config.tileSize / 2)),
                z: Math.floor(player.position.z / (config.tileSize / 2))
            },
            visibleRadiusStart: [
                Math.floor(player.position.x / (config.tileSize / 2)) - config.tileRadiusVisible,
                Math.floor(player.position.z / (config.tileSize / 2)) - config.tileRadiusVisible
            ],
            visibleRadiusEnd: [
                Math.floor(player.position.x / (config.tileSize / 2)) + config.tileRadiusVisible,
                Math.floor(player.position.z / (config.tileSize / 2)) + config.tileRadiusVisible
            ]
        }
    };

    var position = function (event) {
        //TODO:Move to its own file
        event.preventDefault();

        var position = [( event.clientX - containerSize.left ) / containerSize.width, ( event.clientY - containerSize.top ) / containerSize.height];
        mouseVector.fromArray(position);
        mouseVector.set(( mouseVector.x * 2 ) - 1, -( mouseVector.y * 2 ) + 1);

        var intersects = raycaster.intersectByVector(mouseVector);
        if (intersects.length > 0) {
            var intersect = intersects[0];

            //Todo: only use facePosition for the calculations?

            var facePosition = intersect.object.geometry.vertices[intersect.face.a];
            facePosition.applyMatrix4(intersect.object.matrixWorld);

            var newPosition = new THREE.Vector3();
            newPosition.copy(intersect.point).add(intersect.face.normal);
            newPosition.divideScalar(1).floor().multiplyScalar(1).addScalar(1);//x,z,y. Note that Y is half the height of the mesh
            newPosition.x -= 0.5;//Move back
            newPosition.z -= 0.5;
            newPosition.y = parseFloat((facePosition.y + 1).toFixed(1)); //Otherwise the clock will cause issues.

            movements.push(newPosition);

        }
    };

    var move = function () {

        if (!moveTo.equals(player.position)) {
            //Todo: allow for less accurate positioning
            var delta = clock.getDelta();

            if (moveTo.x.toFixed(3) != player.position.x.toFixed(3)) {
                var moveX = parseFloat(((moveTo.x - player.position.x) < 0 ? -(movementSpeed * delta) : (movementSpeed * delta)).toFixed(1));
                player.position.x += moveX;
                camera.position.x += moveX;
            }
            if (moveTo.y.toFixed(3) != player.position.y.toFixed(3)) {
                var moveY = parseFloat(((moveTo.y - player.position.y) < 0 ? -(movementSpeed * delta) : (movementSpeed * delta)).toFixed(1));
                player.position.y += moveY;
                camera.position.y += moveY;
            }
            if (moveTo.z.toFixed(3) != player.position.z.toFixed(3)) {
                var moveZ = parseFloat(((moveTo.z - player.position.z) < 0 ? -(movementSpeed * delta) : (movementSpeed * delta)).toFixed(1));
                player.position.z += moveZ;
                camera.position.z += moveZ;
            }

            player.position.x = parseFloat((player.position.x).toFixed(2));
            player.position.y = parseFloat((player.position.y).toFixed(2));
            player.position.z = parseFloat((player.position.z).toFixed(2));
            updateCamera();
        } else if (movements.length > 0) {
            clock.start();
            moveTo = movements.shift();
            console.log("new position");
            console.log(getPlayerInfo());
        } else {
            //Not moving
            //clock.stop();
        }

    };

    //Todo: mousedown and mouseup instead of click.
    $(container).click(position);


    updateCamera();

    return {
        init: init,
        player: player,
        move: move
    };
});