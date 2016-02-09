/**
 * Debug file with debug options
 *
 * TODO: Ability tu update after changes
 */
define(['jquery', 'three', 'material', 'geometry', 'mesh', 'lights', 'scene', "dat"], function ($, THREE, material, geometry, mesh, lights, scene, dat) {
    var enabled = false;
    var overlay = null;

    var enable = function () {
        enabled = true;
        createOverlay();
        initTree();
    };

    var createOverlay = function () {

        overlay = new dat.GUI();

        var overlaySettings = {
            "Mesh": meshToOverlay,
            "Materials": materialToOverlay,
            "Lights": lightsToOverlay
        };

        guiLoop(overlaySettings, overlay);

    };

    var $debugTree = $("#debugger #object-tree");

    var initTree = function () {
        $debugTree.on("click", "a", function (e) {
            e.preventDefault();
            if($(this).data("id") != undefined){
                console.log(scene.getObjectById($(this).data("id")));
            }else {
                $(this).parent().toggleClass("open");
            }
        });

        var overlaySettings = {
            "Mesh": meshTree
        };

        treeLoop(overlaySettings, $("<ul/>").appendTo($debugTree));
    };

    var treeLoop = function (config, $root) {
        var object;


        for (var key in config) {
            if (!config.hasOwnProperty(key)) continue;

            var configData = config[key];

            if (configData.object != undefined) {
                object = configData.object;
                delete configData.object;
            } else {
                object = undefined;
            }

            if (typeof configData == "function") {
                configData = configData()
            }

            if (typeof configData == "object") {
                //Has no value, so we see it as a folder
                //var folder = gui.addFolder(key);
                //guiLoop(configData,folder);

                var $item = $("<li/>").appendTo($root),
                    $itemLink = $("<a/>").text(key).appendTo($item);

                if (Object.keys(configData).length <= 1 && object != undefined) {
                    $itemLink.data("id",object.id);
                } else {
                    treeLoop(configData, $("<ul/>").appendTo($item));
                }

            }
        }
    };

    var guiLoop = function (config, gui) {
        //Set object for any possible callback
        var object;
        if (typeof config.OBJECT != "undefined") {
            object = config.OBJECT;
            delete config.OBJECT;
        }

        for (var key in config) {
            if (!config.hasOwnProperty(key)) continue;

            var configData = config[key];

            //Functions are also allowed so we call it first for the result
            if (typeof configData == "function") {
                configData = configData()
            }

            if (typeof configData == "object" && typeof configData.value != "undefined") {
                //Set possible GUI parameters
                var opt1 = undefined;
                var opt2 = undefined;
                if (typeof configData.min != "undefined") {
                    opt1 = configData.min
                }
                if (typeof configData.max != "undefined") {
                    opt2 = configData.max
                }
                if (typeof configData.options != "undefined") {
                    opt1 = configData.options
                }

                //Create local value instance for the GUI
                var value = {};
                value[key] = configData.value;

                if (typeof configData.value == "string" && configData.value.indexOf("#") === 0) {
                    //Type is color, need other notation
                    var guiItem = gui.addColor(value, key);
                } else {
                    //Default
                    var guiItem = gui.add(value, key, opt1, opt2);
                }

                if (typeof configData.step != "undefined") {
                    guiItem.step(configData.step)
                }

                if (typeof configData.onChange != "undefined") {
                    //Auto fill callback if it is not set
                    if (typeof configData.onChange["item"] == "undefined") {
                        configData.onChange["item"] = object
                    }
                    if (typeof configData.onChange["option"] == "undefined") {
                        configData.onChange["option"] = key
                    }
                    guiItem.onChange(updateItem.bind(configData.onChange));
                }

            } else if (typeof configData == "object") {
                //Has no value, so we see it as a folder
                var folder = gui.addFolder(key);
                guiLoop(configData, folder);
            }

        }
    };

    var meshTree = function () {
        var data = {};

        $.each(mesh.get(), function (name, meshItem) {
            data[name] = {
                object: meshItem
            };
        });

        return data;
    };

    var meshToOverlay = function () {

        var data = {};
        $.each(mesh.get(), function (name, meshItem) {
            data[name] = {
                "OBJECT": meshItem,
                "position": {
                    "OBJECT": meshItem.position,
                    x: {
                        value: meshItem.position.x,
                        onChange: {}
                    },
                    y: {
                        value: meshItem.position.y,
                        onChange: {}
                    },
                    z: {
                        value: meshItem.position.z,
                        onChange: {}
                    }
                },
                "rotation": {
                    "OBJECT": meshItem.rotation,
                    x: {
                        value: parseFloat(meshItem.rotation.x),
                        min: -Math.PI,
                        max: Math.PI,
                        step: 0.1,
                        onChange: {}
                    },
                    y: {
                        value: parseFloat(meshItem.rotation.y),
                        min: -Math.PI,
                        max: Math.PI,
                        step: 0.1,
                        onChange: {}
                    },
                    z: {
                        value: parseFloat(meshItem.rotation.z),
                        min: -Math.PI,
                        max: Math.PI,
                        step: 0.1,
                        onChange: {}
                    }
                },
                "scale": {
                    "OBJECT": meshItem.scale,
                    x: {
                        value: meshItem.scale.x,
                        min: -10,
                        max: 10,
                        step: 0.001,
                        onChange: {}
                    },
                    y: {
                        value: meshItem.scale.y,
                        min: -10,
                        max: 10,
                        step: 0.001,
                        onChange: {}
                    },
                    z: {
                        value: meshItem.scale.z,
                        min: -10,
                        max: 10,
                        step: 0.001,
                        onChange: {}
                    }
                },
                "castShadow": {
                    value: meshItem.castShadow,
                    onChange: {} //When we do want to change but has no spesific attributes we just init an empty object
                },
                "receiveShadow": {
                    value: meshItem.receiveShadow,
                    onChange: {}
                },
                "material": {
                    value: meshItem.material.name
                },
                "visible": {
                    value: meshItem.visible,
                    onChange: {}
                }
            };

        });

        return data;
    };

    var materialToOverlay = function () {
        var data = {};

        $.each(material.get(), function (name, materialItem) {

            data[name] = {
                "OBJECT": materialItem,
                "type": {
                    value: materialItem.type,
                },
                "color": {
                    value: "#" + materialItem.color.getHexString(),
                    onChange: {type: 'color'}
                },
                "emissive": {
                    value: "#" + materialItem.emissive.getHexString(),
                    onChange: {type: 'color'}
                },
                "specular": {
                    value: "#" + materialItem.specular.getHexString(),
                    onChange: {type: 'color'}
                },
                "shininess": {
                    value: materialItem.shininess,
                    min: 0,
                    max: 100,
                    onChange: {}
                },
                "shading": {
                    value: materialItem.shading,
                    options: {"THREE.FlatShading": THREE.FlatShading, "THREE.SmoothShading": THREE.SmoothShading},
                    onChange: {}
                },
                "wireframe": {
                    value: materialItem.wireframe,
                    editable: true,
                    onChange: {}
                },
                "visible": {
                    value: materialItem.visible,
                    onChange: {}
                }
            };

        });
        return data;
    };

    var lightsToOverlay = function () {
        var data = {};

        $.each(lights.get(), function (name, lightItem) {
            data[name] = {
                "OBJECT": lightItem,
                "type": {
                    value: lightItem.type
                },
                "color": {
                    value: "#" + lightItem.color.getHexString(),
                    onChange: {type: 'color'}
                },
                "position": {
                    "OBJECT": lightItem.position,
                    x: {
                        value: lightItem.position.x,
                        onChange: {}
                    },
                    y: {
                        value: lightItem.position.y,
                        onChange: {}
                    },
                    z: {
                        value: lightItem.position.z,
                        onChange: {}
                    }
                },
                "visible": {
                    value: lightItem.visible,
                    onChange: {}
                }
            };

            if (typeof lightItem.intensity != "undefined") {
                data[name]["intensity"] = {
                    value: lightItem.intensity,
                    min: 0,
                    max: 100,
                    onChange: {}
                };
            }
        });

        return data;
    };

    var updateItem = function (value) {
        if (typeof this.item == "undefined" || this.option == "undefined") {
            console.error("unable to set value, no item or option given");
            return false;
        }

        if (typeof this.type == "undefined") {
            this.type = "default"
        }
        switch (this.type.toLowerCase()) {
            case "color":
                value = value.replace('#', '0x');
                this.item[this.option].setHex(value);
                break;
            case "vector":
                if (typeof value == "string") {
                    value = value.split(",");
                    this.item[this.option].fromArray(value);
                } else {
                    if (typeof this.option == "string") {
                        this.option = this.option.split(".");
                    }
                    this.item[this.option[0]][this.option[1]] = value;
                }
                break;
            default:
                this.item[this.option] = value;
                break;
        }

    };
    var addMarker = function (x, y, z) {
        if (enabled) {
            var marker = new THREE.Mesh(new THREE.SphereGeometry(200), new THREE.MeshLambertMaterial({color: 0xff0000}));
            marker.position.set(x, y, z);
            scene.add(marker);
        }
    };

    return {
        enable: enable,
        addMarker: addMarker
    };
});