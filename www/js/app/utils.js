/**
 * Debug file with debug options
 *
 */
define(['jquery', 'three'], function ($, THREE) {

    var deepObjectGet = function (object, path) {
        if (typeof path == "string") {
            path = path.split('.');
        }

        for (var i = 0; i < path.length; i++) {
            object = object[path[i]];
        }
        return object;
    };

    var deepObjectSet = function (object, value, path) {
        if (typeof path == "string") {
            path = path.split('.');
        }

        console.log(path);

        var cache = object;

        for (var i = 0; i < path.length; i++) {
            cache = cache[path[i]] = i !== path.length - 1 ? {} : value;
        }

        return object;
    };

    return {
        deepObjectGet: deepObjectGet,
        deepObjectSet: deepObjectSet
    };

});