define(["three", "mesh", "player", "raycaster"], function (THREE, mesh, player, raycaster) {
    var collisionTest = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshLambertMaterial({color: 0xff0000}));
    collisionTest.position.y += 1;
    collisionTest.position.x -= 5;

    mesh.set("test1", "collidable", collisionTest);

    var caster = new THREE.Raycaster();

    //Todo: better rays
    var rays = [
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(1, 0, 1),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(1, 0, -1),
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(-1, 0, -1),
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(-1, 0, 1)
    ];

    var checkCollision = function (origin) {
        var collideMeshes = mesh.getArray(undefined,"collidable");

        for (var vertex = 0; vertex < rays.length; vertex++) {
            caster.set( origin, rays[vertex] );
            var collisionResults = caster.intersectObjects( collideMeshes );
            if ( collisionResults.length > 0 && collisionResults[0].distance <= 0.5){
                return true;
            }
        }

        return false;
    };


    return {
        checkCollision: checkCollision
    };
});