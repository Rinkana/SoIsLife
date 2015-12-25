/**
 * For creation of the THREE global in requirejs
 *
 * Please add all THEE.js addins here (and the main.js)
 */
define(["threeCore", "OrbitControls","PointerLockControls","SkyShader"], function (threeCore) {
    return threeCore;
});