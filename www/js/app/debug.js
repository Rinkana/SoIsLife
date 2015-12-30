/**
 * Debug file with debug options
 *
 * Todo: how do i call this from the developer console?
 */
define(['jquery','scene'],function($,scene){
    var enabled = false;

    var enable = function(){
        enabled = true;
    };

    var addMarker = function(x,y,z){
        if(enabled){
        }
    };

    return {
        enable:enable,
        addMarker:addMarker
    };
});