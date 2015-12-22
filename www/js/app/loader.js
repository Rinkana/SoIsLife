define(['three', 'scene', 'material'], function (THREE, scene, material) {
    var loader = new THREE.JSONLoader();
    var objects = [];

    var loadModel = function (x,y,z) {
        x = ( typeof x == "undefined" ? 0 : x );
        y = ( typeof x == "undefined" ? 0 : y );
        z = ( typeof x == "undefined" ? 0 : z );
        loader.load("/models/floor-0-0.js", function (geometry) {
            geometry.scale(50,50,50);

            var mesh = new THREE.Mesh( geometry, material.floor );
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.doubleSided = false;
            //mesh.rotateY(Math.PI / 2);

            var object = new THREE.Object3D();
            object.add(mesh);
            object.position.set(x,y,z);
            object.castShadow = true;
            object.receiveShadow = true;
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