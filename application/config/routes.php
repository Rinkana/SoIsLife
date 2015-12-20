<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 19-Dec-15
 * Time: 16:50
 */
use routing\Route;

return [
    Route::get("scripts/:script","Script|get")->setConstraints(["script" => ".+"]),
    Route::get("model/:x/:y/:z","Model|get"),
    Route::get(":page","Index")->setConstraints(["page" => ".+"])
];