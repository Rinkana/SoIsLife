<?php

/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 19-Dec-15
 * Time: 17:53
 */
use \routing\BaseController;

class IndexController extends BaseController
{
    public function index(){
        include(ROOT."/application/views/main.php");
        exit();
    }
}