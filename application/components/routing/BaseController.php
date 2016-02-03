<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 19-Dec-15
 * Time: 17:53
 */

namespace routing;

use web\Request;
use web\View;

abstract class BaseController
{
    /**
     * @var Request
     */
    protected $request;

    /**
     * @var View
     */
    protected $view;

    final public function __construct()
    {
        $this->view = new View();
    }

    public function index(){
        var_dump($this);
    }

    final public function renderView($name = ""){
        $name = ($name == "" ? lcfirst(str_replace("Controller","",get_class($this))) : $name);

        return $this->view->getHTML($name);
        //var_dump($name);
    }
}