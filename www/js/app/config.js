/**
 * General config file
 *
 * Todo: load and validate from server
 *
 */
define([],function(){

    return {
        tileSize:64, //How many SQUARES a tile has
        tileRadiusVisible:3, //The tile radius that is visible
        tileRadiusBuffer:5 //When the player moves away more then this amount the tiles will be unloaded
    };

});