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
        var xPos = (player.position.x / (config.tileSize / 2));
        xPos = (xPos > 0 ? Math.floor(xPos) : Math.ceil(xPos));
        var zPos = (player.position.z / (config.tileSize / 2));
        zPos = (zPos > 0 ? Math.floor(zPos) : Math.ceil(zPos));

        var currentTile = {
            x: xPos,
            z: zPos
        };

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

        //Todo: less ugly rounding...
        player.position.add(newPosition)
        player.position.x = parseFloat((player.position.x).toFixed(2));
        player.position.y = parseFloat((player.position.y).toFixed(2));
        player.position.z = parseFloat((player.position.z).toFixed(2));

        camera.position.add(newPosition);
        camera.position.x = parseFloat((camera.position.x).toFixed(2));
        camera.position.y = parseFloat((camera.position.y).toFixed(2));
        camera.position.z = parseFloat((camera.position.z).toFixed(2));

        controls.target.copy(player.position);
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

    //Todo: mousedown and mouseup instead of click.
    $(container.element).click(function (event) {
        event.preventDefault();
        position.calculateNewPosition(event.clientX, event.clientY);
    });


    return {
        init: init,
        player: player,
        move: move
    };
});