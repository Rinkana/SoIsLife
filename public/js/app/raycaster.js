/**
 * Setup an raycaster
 */
define(["three","camera","mesh"],function(THREE,camera,mesh){
    var raycaster = new THREE.Raycaster(  );

    var intersectByVector = function(vector,objects){
        objects = (objects == undefined ? mesh.getArray() : objects);

        //Todo, not all object can be raycasted. What to do?

        raycaster.setFromCamera(vector, camera);

        return raycaster.intersectObjects(objects);
    };

    return {
        raycaster:raycaster,
        intersectByVector:intersectByVector
    };
});