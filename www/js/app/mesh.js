/**
 * Todo: use this for geometry handling and caching
 */
define(["jquery","three","geometry","material","utils"],function($,THREE,geometry,material,utils){
    var meshes = {
    };

    var set = function(name,object){
        console.log(name,object);
        meshes[name] = object;
    };

    var get = function(name){
        //Todo: not found object
        if(typeof name == "undefined"){
            return meshes;
        }

        return utils.deepObjectGet(meshes,name);
    };

    var remove = function(name){
        delete meshes[name];
    };

    var getArray = function(){
        return Object.keys(meshes).map(function (key) {return meshes[key]});
    };
    
    var load = function(geometryName,materialName){
        var name = geometryName+"-"+materialName;

        //Todo: error handling
        set(name,new THREE.Mesh(geometry.load(geometryName),material.load(materialName)));

    };

    return {
        get:get,
        remove:remove,
        getArray: getArray,
        set:set,
        load:load
    };
});