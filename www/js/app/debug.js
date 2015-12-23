define(['jquery','three','lights','scene'],function($,THREE,lights,scene){

    var enable = function(){
        $.each(lights, function(i,light){
            var marker = new THREE.Mesh(new THREE.SphereGeometry(200), new THREE.MeshLambertMaterial({color: 0xff0000}));
            marker.position.copy(light.position);
            scene.add(marker);
            if(light.castShadow){
                scene.add(new THREE.CameraHelper(light.shadow.camera));
            }
        });
    };

    return {
        enable:enable
    };
});