/**
 * Get the materials
 *
 * Todo: load trough textureloader
 * Todo: Better caching
 *
 */
define(["three"], function (THREE) {
    return {
        floor: new THREE.MeshPhongMaterial({
            color: 0x000000,
            emissive: 0xFF8040,
            specular: 0xffffff,
            shading: THREE.FlatShading,
            shininess: 1,
            side: THREE.FrontSide
        })
    }
});