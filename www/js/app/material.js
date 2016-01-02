/**
 * Get the materials
 *
 *
 */
define(["three"], function (THREE) {

    var materials = {
    };

    var set = function(name,object){
        console.log(name,object);
        materials[name] = object;
    };

    var get = function(name){
        //Todo: not found object
        return materials[name];
    };

    var loadObject = function(file,callback){

        //var filename = file.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "");
        //Todo: load
    };

    var load = function(file,callback) {
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