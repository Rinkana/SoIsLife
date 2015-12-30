/**
 * Todo: use this for geometry handling and caching
 */
define(["jquery","babylon","scene"],function($,BABYLON,scene){
    var textures = {};

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

    var loadTexture = function(file){
        //Todo: one regex?
        var filename = file.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "");
        var texture = new BABYLON.Texture(file, scene);
        set(filename,texture);
    };

    var load = function(file, callback){

        if(typeof file == "object"){

            $.each(file,function(i,file){
                loadTexture(file);
            });

        }else if(typeof file == "string"){
            loadTexture(file);
        }
        (typeof callback == "function" ? callback() : null);

    };

    return {
        get:get,
        set:set,
        load:load
    };
});