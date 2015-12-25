<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 19-Dec-15
 * Time: 16:39
 */

namespace core;

use \routing\Router;
use web\Request;

class Kernel
{
    protected $request;

    public function __construct()
    {
        //Setup extra autoloader.

        new Autoloader(Config::get("autoloader"));

        $this->setVars();

        $this->run();
    }

    /**
     * Set the core requred vars
     */
    public function setVars()
    {

        $this->request = new Request();

    }

    /**
     * Init done? Continue to the deeper layers for the output.
     */
    public function run(){
        $router = new Router();
        $router->route($this->request);
    }
}