/**
 * Setup the control method
 */
define(["three","camera","container"],function(THREE,camera,container){
    var mainControls = new THREE.OrbitControls(camera,container.element);
    mainControls.enablePan = false;
    mainControls.maxPolarAngle = Math.PI/4;
    mainControls.minDistance = 5;
    mainControls.maxDistance = 25;

    var transformControls = new THREE.TransformControls( camera, container.element );
    //transformControls.setSize(0.5);
    //transformControls.setMode("Y");
    return {
        main:mainControls,
        transform:transformControls
    };
});