/**
 * Setup an raycaster for collision detection
 */
define(["three","camera","mesh"],function(THREE,camera,mesh){
    var raycaster = new THREE.Raycaster(  );

    var intersectByVector = function(vector,objects){
        objects = (typeof objects == "undefined" ? [mesh.get("floor")] : objects);

        raycaster.setFromCamera(vector, camera);

        return raycaster.intersectObjects(objects);
    };

    return {
        raycaster:raycaster,
        intersectByVector:intersectByVector
    };
});