/**
 * Terrain buffer geometry. For super fast geometry creation.
 *
 * @todo UV
 * @todo index?
 * @todo normal
 * @param points
 * @param size
 * @constructor
 */
THREE.TerrainBufferGeometry = function (points, size) {
    THREE.BufferGeometry.call(this);

    this.type = "TerrainBufferGeometry";

    this.parameters = {
        points: points,
        size: size
    };

    points = points === undefined ? "random" : points;
    size = size || 1;

    var width = (points[0].length / 2) - 0.5,
        depth = (points.length / 2) - 0.5,
        faceCounter = 0;

    console.log(points);

    var vertices = new Float32Array( ( (points[0].length - 1) * (points.length - 1)) * 18 );
    var normals = new Float32Array( ( (points[0].length - 1) * (points.length - 1)) * 18 );
    var uvs = new Float32Array( ( (points[0].length - 1) * (points.length - 1)) * 12 );

    var offset = 0;
    var offset2 = 0;
    for ( var ix = -width; ix < width; ix++ ) {
        for (var iz = -depth; iz < depth; iz++) {

            var a = points[iz + depth][ix + width] * size / 3;
            var b = points[iz + depth][ix + 1 + width] * size / 3;
            var c = points[iz + 1 + depth][ix + width] * size / 3;
            var d = points[iz + 1 + depth][ix + 1 + width] * size / 3;

            /*
             * Face 1
             */
            //Vertices
            vertices[offset] = ix * size;
            vertices[offset + 1] = a;
            vertices[offset + 2] = (-1 * iz) * size;

            vertices[offset + 3] = (ix + 1) * size;
            vertices[offset + 4] = b;
            vertices[offset + 5] = (-1 * iz) * size;

            vertices[offset + 6] = ix * size;
            vertices[offset + 7] = c;
            vertices[offset + 8] = (-1 + (-1 * iz)) * size;

            //Face 2
            vertices[offset + 9] = (ix + 1) * size;
            vertices[offset + 10] = b;
            vertices[offset + 11] = (-1 * iz) * size;

            vertices[offset + 12] = (ix + 1) * size;
            vertices[offset + 13] = d;
            vertices[offset + 14] = (-1 + (-1 * iz)) * size;

            vertices[offset + 15] = ix * size;
            vertices[offset + 16] = c;
            vertices[offset + 17] = (-1 + (-1 * iz)) * size;

            offset += 18;
            offset2 += 12;
        }
    }
    console.log(offset,vertices);
    //this.setIndex( new THREE.BufferAttribute( indices, 1 ) );
    this.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    this.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );
    this.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
    //this.computeBoundingSphere();
};

THREE.TerrainBufferGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );