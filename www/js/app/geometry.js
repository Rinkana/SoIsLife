/**
 * Todo: use this for geometry handling and caching
 */
define(["three","loader"],function(THREE,loader){
    var objects = {
        cube:new THREE.BoxGeometry( 200, 200, 200 )
    };

    var set = function(name,object){
        objects[name] = object;
    };

    var get = function(name){
        //Todo: not found object
        return objects[name];
    };

    var load = function(file){

    };

    return {
        get:get,
        set:set,
        load:load
    };
});