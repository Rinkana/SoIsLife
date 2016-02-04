/**
 * Setup the scene
 */
define(["three"],function(THREE){
    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0x000000, 0.01 );
    return scene;
});