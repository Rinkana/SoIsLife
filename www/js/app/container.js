/**
 * Get the container element
 *
 * Todo: make this variable
 */
define([],function(){
    var container = document.getElementById("container");

    var getContainerSize = function(){
        return container.getBoundingClientRect();
    };

    return {
        element:container,
        getContainerSize:getContainerSize
    }
});