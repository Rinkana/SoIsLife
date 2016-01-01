/**
 * Create a camera
 *
 * Todo: do we need jquery for this?
 */
define(["jquery","babylon", "scene", "container"], function ($, BABYLON, scene, container) {

    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI, Math.PI / 2.1, 24, BABYLON.Vector3.Zero(), scene);
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = (Math.PI / 2) * 0.9;
    camera.lowerRadiusLimit = 5
    camera.upperRadiusLimit = 250;
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