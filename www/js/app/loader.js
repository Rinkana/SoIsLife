define(['three', 'scene', 'material'], function (THREE, scene, material) {
    var loader = new THREE.JSONLoader();
    var objects = [];

    var loadModel = function () {
        loader.load("/models/floor-0-0.js", function (geometry) {
            geometry.scale(200,200,200);
            var object = new THREE.Object3D();
            object.add(new THREE.Mesh( geometry, material.floor ));
            object.position.y -= 100;
            console.log(object.position);
            scene.add(object);
            objects.push(object);
        });
    };

    var getObjects = function(){
        return objects;
    };

    return {
        getObjects:getObjects,
        loadModel: loadModel,
        loader: loader
    };
});