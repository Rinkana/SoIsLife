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
    public function get($script){
        if(file_exists(ROOT."node_modules/".$script)){
            readfile(ROOT."node_modules/".$script);
            exit();
        }
    }
}