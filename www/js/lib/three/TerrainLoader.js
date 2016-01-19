THREE.TerrainLoader = function(manager){
    this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;
    this.squareSize = 1;
};

THREE.TerrainLoader.prototype = {

    constructor: THREE.TerrainLoader,

    load: function( url, onLoad, onProgress, onError ){
        var scope = this;

        var loader = new THREE.XHRLoader(scope.manager);
        loader.setCrossOrigin( this.crossOrigin );
        loader.load(url,function(text){
            onLoad(scope.parse(text));
        },onProgress,onError);

    },

    setCrossOrigin: function(value){
        this.crossOrigin = value;
    },

    setSize: function(value){
        this.squareSize = value;
    },

    parse: function(text){
        var data = text.split("\n");

        for(var row in data){
            if (!data.hasOwnProperty(row)) continue;
            if(data[row].length == 0){
                data.splice(row,1);
            }else{
                data[row] = data[row].split(",").map(function(value){
                    return parseFloat(value);
                });
            }
        }

        return new THREE.TerrainGeometry(data,this.squareSize);
    }

};