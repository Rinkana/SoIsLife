define(["jquery","three", "container"], function ($,THREE, container) {
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000000);
    camera.position.z = 40;
    //camera.setLens(20);

    var updateSize = function(){
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
    };

    $(window).resize(updateSize);
    updateSize();

    return camera;

});