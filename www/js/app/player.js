/**
 * Load the engine
 */
define(["jquery", "babylon", "scene","camera"], function ($, BABYLON, scene, camera) {
    var player = BABYLON.Mesh.CreateBox("player", 10, scene);

    camera.target = player;

    scene.onPointerDown = function(evt, pickResult){
        console.log(pickResult);

        if(pickResult.hit){
            var moveTo = {
                x: pickResult.pickedPoint.x,
                y: pickResult.pickedPoint.y,
                z: pickResult.pickedPoint.z
            };

            if (Math.abs(moveTo.x) % 10 > 7.5) { moveTo.x -= (5 - (Math.abs(moveTo.x) % 10)); }else
            if (Math.abs(moveTo.x) % 10 < 2.5) { moveTo.x += (5 - (Math.abs(moveTo.x) % 10)); }
            if (Math.abs(moveTo.z) % 10 > 7.5) { moveTo.z -= (5 - (Math.abs(moveTo.z) % 10)); }else
            if (Math.abs(moveTo.z) % 10 < 2.5) { moveTo.z += (5 - (Math.abs(moveTo.z) % 10)); }

            console.log(moveTo);

            //BABYLON.Animation.CreateAndStartAnimation("anim", player, "position", 30, 120, player.position, player.position.add(new BABYLON.Vector3(Math.round(moveTo.x / 5) * 5, Math.round(moveTo.y / 5) * 5, Math.round(moveTo.z / 5) * 5)),BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

            player.position.x = Math.round(moveTo.x / 5) * 5;
            player.position.y = Math.round(moveTo.y / 5) * 5;
            player.position.z = Math.round(moveTo.z / 5) * 5;
        }
    };

    return player;
});