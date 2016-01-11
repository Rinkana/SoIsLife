/**
 * Create a camera
 *
 * Todo: do we need jquery for this?
 */
define(["jquery", "three", "container"], function ($, THREE, container) {

    //var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    var cameraSize = 512;
    var cameraSize = {
        left: window.innerWidth / -2,
        right: window.innerWidth / 2,
        top: window.innerHeight / 2,
        bottom: window.innerHeight / -2
    }
    var camera = new THREE.OrthographicCamera(  cameraSize.left,  cameraSize.right, cameraSize.top, cameraSize.bottom, -500, 1000 );
    camera.fov = 70;
    camera.zoom = 10;
    camera.position.z = 40;

    var updateFocus = function (vector) {
        //Todo: implement
    };

    var updateSize = function () {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
    };

    $(window).resize(updateSize);
    updateSize();

    return camera;

});