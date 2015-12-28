/**
 * Todo: use this for geometry handling and caching
 */
define(["jquery","three","loader"],function($,THREE,loader){
    var geometries = {
        cube:new THREE.BoxGeometry( 200, 200, 200 )
    };

    var set = function(name,object){
        geometries[name] = object;
    };

    var get = function(name){
        //Todo: not found object
        return geometries[name];
    };

    var loadObject = function(file,callback){
        /*if($.isPlainObject(file) && typeof settings == "undefined"){
            settings = file;
            file = settings.file;
            delete settings.file;
        }else{

        }*/

        var filename = file.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "");
        loader.modelLoader.load(file,function(geometry){
            set(filename,geometry);
            (typeof callback == "function" ? callback() : null );
        });
    };

    var load = function(file,callback) {
        /*if(typeof settings == "function" && typeof callback == "undefined"){
            callback = settings;
            settings = undefined;
        }*/

        if ($.isArray(file)) {
            if(file.length == 1){
                file = file[0];
                load(file,callback);
            }else{
                var fileToLoad = file.shift();
                loadObject(fileToLoad,function(){
                    load(file,callback);
                });
            }
        } else {
            loadObject(file,callback);
        }
    };

    return {
        get:get,
        set:set,
        load:load
    };
});