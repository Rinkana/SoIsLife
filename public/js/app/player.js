/**
 * Load the engine
 */
define(["jquery", "container", "three", "controls", "mesh", "camera", "terrain", "config"], function ($, container, THREE, controls, mesh, camera, terrain, config) {
    var player = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), new THREE.MeshLambertMaterial({color: 0xff0000}));
    player.position.y += 2;

    mesh.set("player","utils",player);

    var init = function () {

    };


    var getPlayerInfo = function () {
        //Get the tile on wich the player is currently on
        var xPos = Math.ceil( (player.position.x - (config.tileSize / 2)) / config.tileSize),
            zPos = Math.ceil( (player.position.z - (config.tileSize / 2)) / config.tileSize);

        var currentTile = {
            x: xPos,
            z: zPos
        };

        //console.log(currentTile);

        return {
            currentTile: currentTile,
            visibleRadius: {
                start: {
                    x: currentTile.x - config.tileRadiusVisible,
                    z: currentTile.z - config.tileRadiusVisible
                },
                end: {
                    x: currentTile.x + config.tileRadiusVisible,
                    z: currentTile.z + config.tileRadiusVisible
                }
            }
        }
    };


    var setNewPosition = function (newPosition) {

        player.position.add(newPosition);
        camera.position.add(newPosition);

        controls.main.target.copy(player.position);
    };

    setInterval(function(){
        terrain.buildTileRadius(getPlayerInfo());
    },2000);

    /*$(container.element).click(function (event) {
        event.preventDefault();
        position.calculateNewPosition(event.clientX, event.clientY);
    });*/


    return {
        init: init,
        player: player,
        getPlayerInfo:getPlayerInfo,
        setNewPosition:setNewPosition
    };
});