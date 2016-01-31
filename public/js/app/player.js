/**
 * Load the engine
 */
define(["jquery", "container", "three", "controls", "scene", "camera", "terrain", "position", "config"], function ($, container, THREE, controls, scene, camera, terrain, position, config) {
    var player = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), new THREE.MeshLambertMaterial({color: 0xff0000}));

    player.position.y += 2;
    scene.add(player);

    var init = function () {

    };


    var getPlayerInfo = function () {
        //Get the tile on wich the player is currently on
        console.log("slowstart");
        var xPos = (player.position.x / (config.tileSize / 2));
        xPos = (xPos > 0 ? Math.floor(xPos) : Math.ceil(xPos));
        var zPos = (player.position.z / (config.tileSize / 2));
        zPos = (zPos > 0 ? Math.floor(zPos) : Math.ceil(zPos));

        var currentTile = {
            x: xPos,
            z: zPos
        };

        console.log(currentTile);

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
            },
            bufferRadius: {
                start: {
                    x: currentTile.x - config.tileRadiusBuffer,
                    z: currentTile.z - config.tileRadiusBuffer
                },
                end: {
                    x: currentTile.x + config.tileRadiusBuffer,
                    z: currentTile.z + config.tileRadiusBuffer
                }
            }
        }
    };


    var setNewPosition = function (newPosition) {

        player.position.add(newPosition);
        camera.position.add(newPosition);

        controls.main.target.copy(player.position);
    };

    var move = function () {

        var nextMovement = position.getNextMovement(player.position);

        if (typeof nextMovement == "object") {
            setNewPosition(nextMovement);
        } else if (nextMovement === true) {
            terrain.buildTileRadius(getPlayerInfo());
            console.log();
        }

    };

    /*$(container.element).click(function (event) {
        event.preventDefault();
        position.calculateNewPosition(event.clientX, event.clientY);
    });*/


    return {
        init: init,
        player: player,
        move: move,
        getPlayerInfo:getPlayerInfo
    };
});