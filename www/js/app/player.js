/**
 * Load the engine
 */
define(["jquery","container", "three", "controls", "scene","raycaster","clock"], function ($,container, THREE, controls, scene, raycaster,clock) {
    var player = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), new THREE.MeshLambertMaterial({color: 0xff0000}));
    var mouseVector = new THREE.Vector2();
    var containerSize = container.getBoundingClientRect();
    var moveTo = new THREE.Vector3();

    var moveToStep = new THREE.Vector3();
    player.position.y += 2;
    scene.add(player);


    var movementSpeed = 5; //per second

    var updateCamera = function () {

        controls.target = player.position;

    };

    var position = function(event){
        //TODO:Move to its own file
        event.preventDefault();

        var position = [( event.clientX - containerSize.left ) / containerSize.width, ( event.clientY - containerSize.top ) / containerSize.height];
        mouseVector.fromArray(position);
        mouseVector.set(( mouseVector.x * 2 ) - 1, -( mouseVector.y * 2 ) + 1);

        var intersects = raycaster.intersectByVector(mouseVector);
        if(intersects.length > 0) {
            var intersect = intersects[0];
            moveTo.copy(intersect.point).add(intersect.face.normal);
            moveTo.divideScalar(1).floor().multiplyScalar(1).addScalar(1);//x,z,y. Note that Y is half the height of the mesh
            moveTo.x -= 0.5;//Move back
            moveTo.z -= 1.5;

            console.log(moveTo);

            console.log(moveTo,player.position);


            //How many blocks do i need to move to get where i want to be
            console.log((moveTo.x - player.position.x - 1));
            console.log((moveTo.y - player.position.y - 1));
            console.log((moveTo.z - player.position.z - 1));

            //Restart the clock for new delta calculations
            clock.start();
            //player.position.copy(moveTo);
        }
    };

    var move = function(){

        if(!moveTo.equals(player.position)){
            //
            var delta = clock.getDelta();

            if(moveTo.x.toFixed(3) != player.position.x.toFixed(3)){
                player.position.x += (moveTo.x - player.position.x) < 0 ? -(movementSpeed * delta) : (movementSpeed * delta);
            }
            if(moveTo.y.toFixed(3) != player.position.y.toFixed(3)){
                player.position.y += (moveTo.y - player.position.y) < 0 ? -(movementSpeed * delta) : (movementSpeed * delta);
            }
            if(moveTo.z.toFixed(3) != player.position.z.toFixed(3)){
                player.position.z += (moveTo.z - player.position.z) < 0 ? -(movementSpeed * delta) : (movementSpeed * delta);
            }

            player.position.x = parseFloat((player.position.x).toFixed(1));
            player.position.y = parseFloat((player.position.y).toFixed(1));
            player.position.z = parseFloat((player.position.z).toFixed(1));
            updateCamera();
        }else{
            //Not moving
            //clock.stop();
        }


        //var newPosition = new THREE.Vector3();
        //newPosition.x = moveTo.x - player.position.x * delta;
        //newPosition.y = moveTo.y - player.position.y * delta ;
        //newPosition.z = moveTo.z - player.position.z * delta;

        //player.position.copy(newPosition);
        //console.log(delta);
    };

    //Todo: mousedown and mouseup instead of click.
    $(container).click(position);

    /*
     var voxel = new THREE.Mesh( cubeGeometry, cubeMaterial );
     voxel.position.copy( intersect.point ).add( intersect.face.normal );
     voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
     scene.add( voxel );
     */

    updateCamera();

    return {
        player:player,
        move:move
    };
});