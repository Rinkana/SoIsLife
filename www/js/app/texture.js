/**
 * Todo: use this for geometry handling and caching
 */
define(["jquery","three","loader"],function($,THREE,loader){
    var textures = {};
    var busy = false;

    var set = function(name,object){
        textures[name] = object;
    };

    var get = function(name){

        if(typeof name == "undefined"){
            return textures;
        }else{
            //Todo: not found object
            return textures[name];
        }
    };

    var loadTexture = function(file, callback){
        //Todo: one regex?
        var filename = file.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "");
        loader.textureLoader.load(file,function(texture){
            set(filename,texture);
            if(typeof callback == "function"){
                callback();
            }
        });
    };

    var load = function(file, callback){

        if(typeof file == "object"){
            if(file.length == 1){
                //We only have one item in the array. So we run just that one. No need for the shift.
                //The callback will be done there
                file = file[0];
                load(file,callback);
            }else{
                var fileToLoad = file.shift();
                loadTexture(fileToLoad,function(){
                    load(file,callback);
                });
            }

        }else if(typeof file == "string"){
            console.log(file);
            loadTexture(file,callback);
        }

        //file

    };

    return {
        get:get,
        set:set,
        load:load,
        busy:busy
    };
});