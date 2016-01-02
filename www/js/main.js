require.config({
    baseUrl: 'js/app',
    shim: {
        'threeCore': {exports: "THREE"},
        'OrbitControls': {deps: ['threeCore'], exports: "THREE"}
    },
    paths: {
        jquery: "/scripts/jquery/dist/jquery",
        threeCore: "/scripts/three.js/build/three.min",
        OrbitControls: "../lib/three/OrbitControls",
        three: "../lib/three/three"
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