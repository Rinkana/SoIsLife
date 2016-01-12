/**
 * Setup the control method
 */
define(["three","camera","container"],function(THREE,camera,container){
    var controls = new THREE.OrbitControls(camera,container.element);
    controls.enablePan = false;
    return controls;
});