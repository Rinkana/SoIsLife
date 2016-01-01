/**
 * Debug file with debug options
 *
 */
define(['jquery','babylon'],function($,BABYLON){

    var RGBColor = function(r,g,b){
        r = r / 255;
        g = g / 255;
        b = b / 255;

        return new BABYLON.Color3(r,g,b);
    };

    return {
        RGBColor:RGBColor
    };
});