/**
 * Debug file with debug options
 *
 */
define(['jquery','babylon','geometry','scene','lights'],function($,BABYLON,geometry,scene,lights){

    var shadowGenerator = new BABYLON.ShadowGenerator(1024,lights.main);
    shadowGenerator.getShadowMap().renderList.push(geometry.get("floor"));


    return {
    };
});