/**
 * Load the engine
 */
define(["jquery","container", "three", "camera", "scene","raycaster"], function ($,container, THREE, camera, scene, raycaster) {
    var player = new THREE.Mesh(new THREE.BoxGeometry(10, 20, 10), new THREE.MeshLambertMaterial({color: 0xff0000}));
    var mouseVector = new THREE.Vector2();
    var containerSize = container.getBoundingClientRect();
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
            player.position.copy(intersect.point).add(intersect.face.normal);
            player.position.divideScalar(10).floor().multiplyScalar(10).addScalar(10);//x,z,y. Note that Y is half the height of the mesh
            player.position.x -= 5;//Move back
            player.position.z -= 5;
        }

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

    return player;
});