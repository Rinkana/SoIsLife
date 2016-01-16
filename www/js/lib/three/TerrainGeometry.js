//Todo: Make buffer geo?
THREE.TerrainGeometry = function (points, size) {
    THREE.Geometry.call(this);

    this.type = "TerrainGeometry";

    this.parameters = {
        points: points,
        size: size
    };

    points = points === undefined ? "random" : points;
    size = size || 1;

    var width = (points[0].length / 2) - 1,
        depth = (points.length / 2) - 1,
        faceCounter = 0;

    var vector1,
        vector2,
        vector3,
        face;

    var computeFaceNormal = function (v1, v2, v3) {
        var vx = (v1.y - v3.y) * (v2.z - v3.z) - (v1.z - v3.z) * (v2.y - v3.y);
        var vy = (v1.z - v3.z) * (v2.x - v3.x) - (v1.x - v3.x) * (v2.z - v3.z);
        var vz = (v1.x - v3.x) * (v2.y - v3.y) - (v1.y - v3.y) * (v2.x - v3.x);
        var va = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2) + Math.pow(vz, 2));
        return new THREE.Vector3(vx / va, vy / va, vz / va);
    };

    for ( var ix = -width; ix < width; ix++ ) {
        for (var iz = -depth; iz < depth; iz++ ) {

            var faceIndex = faceCounter * 6;
            var faceData = [
                points[iz + depth][ix + width] * size / 3,
                points[iz + depth][ix + 1 + width] * size / 3,
                points[iz + 1 + depth][ix + width] * size / 3,
                points[iz + 1 + depth][ix + 1 + width] * size / 3
            ];

            var vector1 = new THREE.Vector3(ix * size, faceData[0], (-1 * iz) * size);
            var vector2 = new THREE.Vector3((ix + 1) * size, faceData[1], (-1 * iz) * size);
            var vector3 = new THREE.Vector3(ix * size, faceData[2], (-1 + (-1 * iz)) * size);
            this.vertices.push(vector1, vector2, vector3);

            var face = new THREE.Face3(faceIndex, faceIndex + 1, faceIndex + 2);
            face.normal = computeFaceNormal(vector1, vector2, vector3);
            this.faces.push(face);

            //Triangle 2
            vector1 = new THREE.Vector3((ix + 1) * size, faceData[1], (-1 * iz) * size);
            vector2 = new THREE.Vector3((ix + 1) * size, faceData[3], (-1 + (-1 * iz)) * size);
            vector3 = new THREE.Vector3(ix * size, faceData[2], (-1 + (-1 * iz)) * size);
            this.vertices.push(vector1, vector2, vector3);

            face = new THREE.Face3(faceIndex + 3, faceIndex + 4, faceIndex + 5);
            face.normal = computeFaceNormal(vector1, vector2, vector3);
            this.faces.push(face);

            faceCounter++;
        }
    }

    this.computeBoundingSphere();
};

THREE.TerrainGeometry.prototype = Object.create( THREE.Geometry.prototype );