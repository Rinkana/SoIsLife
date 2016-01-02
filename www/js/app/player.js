/**
 * Load the engine
 */
define(["jquery", "three", "camera", "scene"], function ($, THREE, camera, scene) {
    var player = new THREE.Mesh(new THREE.BoxGeometry(10, 20, 10), new THREE.MeshLambertMaterial({color: 0xff0000}));
    player.position.y += 10;
    scene.add(player);

    var updateCamera = function () {

        camera.target = player.position;

    };

    /*
     var voxel = new THREE.Mesh( cubeGeometry, cubeMaterial );
     voxel.position.copy( intersect.point ).add( intersect.face.normal );
     voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
     scene.add( voxel );
     */

    updateCamera();

    return player;
});