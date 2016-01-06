/**
 * Setup the control method
 */
define(["three","camera","container"],function(THREE,camera,container){
    var controls = new THREE.OrbitControls(camera,container);
    controls.enablePan = false;
    return controls;
});