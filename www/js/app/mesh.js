/**
 * Todo: use this for geometry handling and caching
 */
define(["jquery","three","geometry","material"],function($,THREE,geometry,material){
    var meshes = {
    };

    var set = function(name,object){
        meshes[name] = object;
    };

    var get = function(name){
        //Todo: not found object
        if(typeof name == "undefined"){
            return meshes;
        }

        return meshes[name];
    };
    
    var load = function(geometryName,materialName){
        var name = geometryName+"-"+materialName;

        //Todo: error handling
        set(name,new THREE.Mesh(geometry.load(geometryName),material.load(materialName)));

    };

    return {
        get:get,
        set:set,
        load:load
    };
});