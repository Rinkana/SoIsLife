THREE.TerrainBufferGeometry = function (points, size) {
    THREE.BufferGeometry.call(this);

    this.type = "TerrainBufferGeometry";


    this.computeBoundingSphere();
};

THREE.TerrainBufferGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );