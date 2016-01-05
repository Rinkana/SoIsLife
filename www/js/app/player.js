/**
 * Load the engine
 */
define(["jquery","container", "three", "camera", "scene","raycaster","clock"], function ($,container, THREE, camera, scene, raycaster,clock) {
    var player = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), new THREE.MeshLambertMaterial({color: 0xff0000}));
    var mouseVector = new THREE.Vector2();
    var containerSize = container.getBoundingClientRect();
    var moveTo = new THREE.Vector3();
    player.position.y += 10;
    scene.add(player);

    var updateCamera = function () {

        camera.target = player.position;

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
            console.log(Math.abs(moveTo.x - player.position.x));
            console.log(Math.abs(moveTo.y - player.position.y));
            console.log(Math.abs(moveTo.z - player.position.z));

            player.position.copy(moveTo);
        }
        updateCamera();
    };

    var move = function(){
        var delta = clock.getDelta();

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