/**
 * Debug file with debug options
 *
 * Todo: how do i call this from the developer console?
 */
define(['jquery','three','lights','scene'],function($,THREE,lights,scene){
    var enabled = false;

    var enable = function(){
        enabled = true;
        $.each(lights, function(i,light){
            addMarker(light.position.x,light.position.y,light.position.z);
            if(light.castShadow){
                scene.add(new THREE.CameraHelper(light.shadow.camera));
            }
        });
    };

    var addMarker = function(x,y,z){
        if(enabled){
            var marker = new THREE.Mesh(new THREE.SphereGeometry(200), new THREE.MeshLambertMaterial({color: 0xff0000}));
            marker.position.set(x,y,z);
            scene.add(marker);
        }
    };

    return {
        enable:enable,
        addMarker:addMarker
    };
});