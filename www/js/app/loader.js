/**
 * Load models
 *
 * Todo: Split the geometry handling from this file
 * Todo: Add other loaders
 */
define(['three', 'scene', 'material'], function (THREE, scene, material) {
    var loader = new THREE.JSONLoader();
    var objects = [];

    var loadModel = function (x,y,z) {
        x = ( typeof x == "undefined" ? 0 : x );
        y = ( typeof x == "undefined" ? 0 : y );
        z = ( typeof x == "undefined" ? 0 : z );
        loader.load("/models/"+x+"-"+z+".js", function (geometry) {
            //geometry.scale(50,50,50);
            x = parseInt(x.substr(1));
            z = parseInt(z.substr(1));

            x = 0;
            z = 0;
            var mesh = new THREE.Mesh( geometry, material.floor );
            mesh.position.set(0,0,0);
            console.log(mesh);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.doubleSided = false;
            //mesh.rotateY(Math.PI / 2);

            var object = new THREE.Object3D();
            object.add(mesh);
            object.position.set(x,y,z);
            console.log(object.position);
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