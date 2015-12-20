<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 19-Dec-15
 * Time: 17:53
 */

namespace routing;

abstract class BaseController
{
    public final function __construct()
    {

    }

    public function index(){
        var_dump($this);
    }
}