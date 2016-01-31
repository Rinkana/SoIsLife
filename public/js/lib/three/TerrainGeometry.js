//Todo: Make buffer geo?
//Todo: split vertex position calculations
THREE.TerrainGeometry = function (points, size) {
    THREE.Geometry.call(this);

    this.type = "TerrainGeometry";
    this.points = points;
    this.size = size;
    this.precision = 3;//Todo: better name

    this.points = this.points === undefined ? "random" : this.points;
    this.size = this.size || 1;
    this.terrainWidth = this.points[0].length;
    this.terrainDepth = this.points.length;

    var width = (this.terrainWidth / 2) - 0.5,
        depth = (this.terrainDepth / 2) - 0.5;

    var vector1,
        vector2,
        vector3,
        face;

    var faceNormalData;

    this.computeFaceNormal = function (v1, v2, v3) {
        var vx = (v1.y - v3.y) * (v2.z - v3.z) - (v1.z - v3.z) * (v2.y - v3.y);
        var vy = (v1.z - v3.z) * (v2.x - v3.x) - (v1.x - v3.x) * (v2.z - v3.z);
        var vz = (v1.x - v3.x) * (v2.y - v3.y) - (v1.y - v3.y) * (v2.x - v3.x);
        var va = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2) + Math.pow(vz, 2));
        return [
            vx / va,
            vy / va,
            vz / va
        ];
    };

    this.getVertexData = function(x,z){
        return [
            [//Face 1
                [//Vector 1
                    x * size,
                    points[z + depth][x + width] * size / this.precision,
                    (-1 * z) * size
                ],
                [//Vector 2
                    (x + 1) * size,
                    points[z + depth][x + 1 + width] * size / this.precision,
                    (-1 * z) * size
                ],
                [//Vector 3
                    x * size,
                    points[z + 1 + depth][x + width] * size / this.precision,
                    (-1 + (-1 * z)) * size
                ]
            ],
            [//Face 2
                [//Vector 1
                    (x + 1) * size,
                    points[z + depth][x + 1 + width] * size / this.precision,
                    (-1 * z) * size
                ],
                [//Vector 2
                    (x + 1) * size,
                    points[z + 1 + depth][x + 1 + width] * size / this.precision,
                    (-1 + (-1 * z)) * size
                ],
                [//Vector 3
                    x * size,
                    points[z + 1 + depth][x + width] * size / this.precision,
                    (-1 + (-1 * z)) * size
                ]
            ]
        ]
    };

    this.calculatePoints = function () {
        //We want to be able to recalc so we reset the faces and vertices
        var faceCounter = 0;

        for (var ix = -width; ix < width; ix++) {
            for (var iz = -depth; iz < depth; iz++) {

                var faceIndex = faceCounter * 6;

                var vertexData = this.getVertexData(ix,iz);

                vector1 = new THREE.Vector3(vertexData[0][0][0], vertexData[0][0][1], vertexData[0][0][2]);
                vector2 = new THREE.Vector3(vertexData[0][1][0], vertexData[0][1][1], vertexData[0][1][2]);
                vector3 = new THREE.Vector3(vertexData[0][2][0], vertexData[0][2][1], vertexData[0][2][2]);
                this.vertices.push(vector1, vector2, vector3);

                face = new THREE.Face3(faceIndex, faceIndex + 1, faceIndex + 2);
                faceNormalData = this.computeFaceNormal(vector1, vector2, vector3);
                face.normal = new THREE.Vector3(faceNormalData[0],faceNormalData[1],faceNormalData[2]);
                this.faces.push(face);

                //Triangle 2
                vector1 = new THREE.Vector3(vertexData[1][0][0], vertexData[1][0][1], vertexData[1][0][2]);
                vector2 = new THREE.Vector3(vertexData[1][1][0], vertexData[1][1][1], vertexData[1][1][2]);
                vector3 = new THREE.Vector3(vertexData[1][2][0], vertexData[1][2][1], vertexData[1][2][2]);
                this.vertices.push(vector1, vector2, vector3);

                face = new THREE.Face3(faceIndex + 3, faceIndex + 4, faceIndex + 5);
                faceNormalData = this.computeFaceNormal(vector1, vector2, vector3);
                face.normal = new THREE.Vector3(faceNormalData[0],faceNormalData[1],faceNormalData[2]);
                this.faces.push(face);

                faceCounter++;
            }
        }
    };

    //Todo: do i need the face normal calculation?
    //Todo: does the face normal change anything
    this.rebuild = function(){
        var vectorCounter = 0;

        for (var ix = -width; ix < width; ix++) {
            for (var iz = -depth; iz < depth; iz++) {

                var vertexData = this.getVertexData(ix,iz);

                this.vertices[vectorCounter].set(vertexData[0][0][0], vertexData[0][0][1], vertexData[0][0][2]);
                this.vertices[vectorCounter + 1].set(vertexData[0][1][0], vertexData[0][1][1], vertexData[0][1][2]);
                this.vertices[vectorCounter + 2].set(vertexData[0][2][0], vertexData[0][2][1], vertexData[0][2][2]);

                faceNormalData = this.computeFaceNormal(this.vertices[vectorCounter],this.vertices[vectorCounter + 1],this.vertices[vectorCounter + 2]);
                this.faces[vectorCounter / 3].normal.set(faceNormalData[0],faceNormalData[1],faceNormalData[2]);
                vectorCounter += 3;

                this.vertices[vectorCounter].set(vertexData[1][0][0], vertexData[1][0][1], vertexData[1][0][2]);
                this.vertices[vectorCounter + 1].set(vertexData[1][1][0], vertexData[1][1][1], vertexData[1][1][2]);
                this.vertices[vectorCounter + 2].set(vertexData[1][2][0], vertexData[1][2][1], vertexData[1][2][2]);
                faceNormalData = this.computeFaceNormal(this.vertices[vectorCounter],this.vertices[vectorCounter + 1],this.vertices[vectorCounter + 2]);
                this.faces[vectorCounter / 3].normal.set(faceNormalData[0],faceNormalData[1],faceNormalData[2]);
                vectorCounter += 3;
            }
        }

        this.verticesNeedUpdate = true;
    };

    this.calculatePoints();

    this.computeBoundingSphere();
};

THREE.TerrainGeometry.prototype = Object.create(THREE.Geometry.prototype);