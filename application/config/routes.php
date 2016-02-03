<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 19-Dec-15
 * Time: 16:50
 */
use routing\Route;

//Todo: home different
//Todo: set default regex consts
return [
    Route::get("scripts/:script",function($script){
        return readfile(ROOT."node_modules/".$script);
    })->setConstraints(["script" => ".+"]),
    Route::get("model/terrain/:x/:z","Model|getTerrain"),
    Route::get("model/:x/:y/:z","Model|get"),
    Route::get(":page","Index")->setConstraints(["page" => ".+"]),
    Route::get("","Index")
];