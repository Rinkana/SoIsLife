/**
 * Debug file with debug options
 *
 */
define(['jquery', 'three'], function ($, THREE) {

    var deepObjectGet = function (object, path) {
        path = path.split('.');
        for (var i = 0; i < path.length; i++) {
            object = object[path[i]];
        }
        return object;
    };

    var deepObjectSet = function(object,value,path){
        object = deepObjectGet(object,path);


        path = path.split('.');
        for(var i = 0; i < path.length; i++){
            object = object[path[i]];
        }
    };

    return {
        deepObjectGet: deepObjectGet
    };

});