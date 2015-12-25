<?php

/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 20-Dec-15
 * Time: 16:30
 */
use \routing\BaseController;
class ScriptController extends BaseController
{
    /**
     * Load a script file
     *
     * Todo: load from database
     * Todo: return 404 when not found
     *
     * @param $script
     */
    public function get($script){
        if(file_exists(ROOT."node_modules/".$script)){
            readfile(ROOT."node_modules/".$script);
            exit();
        }
    }
}