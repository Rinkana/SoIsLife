/**
 * Create a camera
 *
 * Todo: do we need jquery for this?
 */
define(["jquery","babylon", "scene", "container"], function ($, BABYLON, scene, container) {

    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI, Math.PI / 2.1, 24, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(container);

    var updateFocus = function(vector){
        //Todo: implement
    };

    var updateSize = function(){
    };

    $(window).resize(updateSize);
    updateSize();

    return camera;

});