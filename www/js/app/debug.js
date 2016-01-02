/**
 * Debug file with debug options
 *
 * Todo: better callbacks, aka less writing
 * Todo: Lights
 * Todo: Better positioning (More folders?)
 */
define(['jquery','three','material','geometry','mesh','lights','scene',"dat"],function($,THREE,material,geometry,mesh,lights,scene,dat){
    var enabled = false;
    var overlay = null;

    var enable = function(){
        enabled = true;
        createOverlay();
        /*$.each(lights, function(i,light){
            console.log(light);
            addMarker(light.position.x,light.position.y,light.position.z);
            if(light.castShadow){
                scene.add(new THREE.CameraHelper(light.shadow.camera));
            }
        });*/
    };

    var createOverlay = function(){

        overlay = new dat.GUI();

        var overlaySettings = {
            "Mesh":meshToOverlay,
            "Materials":materialToOverlay
        };

        $.each(overlaySettings,function(mainName,mainData){
            var mainFolder = overlay.addFolder(mainName);

            $.each(mainData(),function(dataName,dataConfig){
                var itemFolder = mainFolder.addFolder(dataName);
                $.each(dataConfig,function(configName,config){
                    var value = {};
                    value[configName] = config.value;
                    if(typeof config.value == "string" && config.value.indexOf("#") === 0){
                        var guiItem = itemFolder.addColor(value,configName);
                    }else{
                        var opt1;
                        var opt2;
                        if(typeof config.min != "undefined"){opt1 = config.min}
                        if(typeof config.max != "undefined"){opt2 = config.max}
                        if(typeof config.options != "undefined"){opt1 = config.options}

                        var guiItem = itemFolder.add(value,configName,opt1,opt2);
                    }

                    if(typeof config.onChange != "undefined"){
                        guiItem.onChange(config.onChange);
                    }
                });
            });
        });

    };

    var meshToOverlay = function(){

        var data = {};

        $.each(mesh.get(),function(name,meshItem){
            data[name] = {
                "Position":{
                    value:meshItem.position.toArray().join(),
                    onChange:updateItem.bind({item:meshItem,option:"position",type:'vector'})
                },
                "Material":{
                    value:meshItem.material.name
                }
            };

        });

        return data;
    };

    var materialToOverlay = function(){
        var data = {};

        $.each(material.get(),function(name,materialItem){

            data[name] = {
                "Type":{
                    value:materialItem.type,
                },
                "Color":{
                    value:"#"+materialItem.color.getHexString(),
                    onChange:updateItem.bind({item:materialItem,option:"color",type:'color'})
                },
                "Emissive":{
                    value:"#"+materialItem.emissive.getHexString(),
                    onChange:updateItem.bind({item:materialItem,option:"emissive",type:'color'})
                },
                "Specular":{
                    value:"#"+materialItem.specular.getHexString(),
                    onChange:updateItem.bind({item:materialItem,option:"specular",type:'color'})
                },
                "Shininess":{
                    value:materialItem.shininess,
                    min:0,
                    max:100,
                    onChange:updateItem.bind({item:materialItem,option:"shininess"})
                },
                "Shading":{
                    value:materialItem.shading,
                    options:{"THREE.FlatShading":THREE.FlatShading,"THREE.SmoothShading":THREE.SmoothShading},
                    onChange:updateItem.bind({item:materialItem,option:"shading"})
                },
                "Wireframe":{
                    value:materialItem.wireframe,
                    editable:true,
                    onChange:updateItem.bind({item:materialItem,option:"wireframe"})
                }
            };

        });
        return data;
    };

    var updateItem = function(value){
        if(typeof this.type == "undefined"){this.type = "default"}
        switch(this.type.toLowerCase()){
            case "color":
                value = value.replace('#', '0x');
                this.item[this.option].setHex(value);
                break;
            case "vector":
                value = value.split(",");
                this.item[this.option].fromArray(value);
                break;
            default:
                this.item[this.option] = value;
                break;
        }

    };
    var addMarker = function(x,y,z){
        if(enabled){
            var marker = new THREE.Mesh(new THREE.SphereGeometry(200), new THREE.MeshLambertMaterial({color: 0xff0000}));
            marker.position.set(x,y,z);
            scene.add(marker);
        }
    };

    return {
        enable:enable,
        addMarker:addMarker
    };
});