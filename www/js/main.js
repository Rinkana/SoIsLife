require.config({
    baseUrl: 'js/app',
    shim: {
        'babylonCore':{exports:"BABYLON"}
    },
    paths: {
        jquery: "/scripts/jquery/dist/jquery",
        babylonCore:"/scripts/babylonjs/babylon",
        babylon:"../lib/babylon/babylon"
    }
});

require([
    // Load our app module and pass it to our definition function
    'app',
], function (App) {
    // The "app" dependency is passed in as "App"
    App.initialize();
});