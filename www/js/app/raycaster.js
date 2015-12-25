/**
 * Setup an raycaster for collision detaction
 */
define(["three"],function(){
    var raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

    return raycaster;
});