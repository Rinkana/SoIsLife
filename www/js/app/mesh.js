/**
 * Todo: use this for geometry handling and caching
 */
define(["jquery","three","geometry","material","utils"],function($,THREE,geometry,material,utils){
    var meshes = {
    };

    var set = function(name,group,object){
        if(meshes[group] === undefined ){
            meshes[group] = {};
        }
        meshes[group][name] = object;

        console.log(object);
    };

    var get = function(name,group){
        //Todo: not found object
        if(typeof name == "undefined"){
            var allMeshes = {};

            var groups = Object.keys(meshes);
            for(var groupKey in groups){
                for(var meshKey in meshes[groups[groupKey]]){
                    if (!meshes[groups[groupKey]].hasOwnProperty(meshKey)) continue;
                    var newName = groups[groupKey]+"."+meshKey;
                    allMeshes[newName] = meshes[groups[groupKey]][meshKey];
                }
            }

            return allMeshes;
        }

        if(group == undefined){
            name = name.split('.');
            group = name[1];
            name = name[0];
        }

        if(meshes[group] == undefined){
            return false;
        }

        return meshes[group][name];
    };

    var remove = function(name){
        delete meshes[name];
    };

    var getArray = function(name, group){
        var object = utils.deepObjectGet(meshes,name);
        return Object.keys(object).map(function (key) {return object[key]});
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