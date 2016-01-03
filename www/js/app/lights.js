/**
 * Setup the lights being used within this scene
 */
define(["three", "scene"], function (THREE, scene) {
    var lights = {};

    var set = function(name,object,addToScene){
        if(typeof addToScene == "undefined"){addToScene = false}
        console.log(name,object);
        lights[name] = object;
        if(addToScene){scene.add(object)}
    };

    var get = function(name){
        //Todo: not found object
        if(typeof name == "undefined"){
            return lights;
        }

        return lights[name];
    };

    return {
        get:get,
        set:set
    };
});