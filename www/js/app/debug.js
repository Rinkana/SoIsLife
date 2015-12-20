define(['jquery','three','lights','scene'],function($,THREE,lights,scene){

    var enable = function(){
        $.each(lights, function(i,light){
            if(light.castShadow){
                scene.add(new THREE.CameraHelper(light.shadow.camera));
            }
        });
    };

    return {
        enable:enable
    };
});