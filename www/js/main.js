require.config({
    baseUrl: 'js/app',
    shim: {
        'threeCore': {exports: "THREE"},
        'OrbitControls': {deps: ['threeCore'], exports: "THREE"},
        'TerrainGeometry': {deps: ['threeCore'], exports: "THREE"},
        'TransformControls': {deps: ['threeCore'], exports: "THREE"},
        'TerrainLoader': {deps: ['threeCore','TerrainGeometry'], exports: "THREE"}
        //'TerrainBufferGeometry': {deps: ['threeCore'], exports: "THREE"}
    },
    paths: {
        jquery: "/scripts/jquery/dist/jquery",
        threeCore: "/scripts/three/three",
        OrbitControls: "../lib/three/OrbitControls",
        //TerrainBufferGeometry: "../lib/three/TerrainBufferGeometry",
        TerrainLoader: "../lib/three/TerrainLoader",
        TerrainGeometry: "../lib/three/TerrainGeometry",
        TransformControls: "../lib/three/TransformControls",
        three: "../lib/three/three",
        dat: "/scripts/exdat/build/dat.gui.min"
    }
});

require([
    // Load our app module and pass it to our definition function
    'app',
], function (App) {
    // The "app" dependency is passed in as "App"
    App.initialize();
    App.animate();
});