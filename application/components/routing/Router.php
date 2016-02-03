<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 19-Dec-15
 * Time: 16:50
 */

namespace routing;

use \core\Config;
use helpers\ArrayBin;
use \web\Request;

class Router
{

    /**
     * @var Route[]
     */
    protected $routes = [];

    public function __construct()
    {
        $this->routes = Config::get("routes");
    }

    /**
     *
     * Find and call the correct route
     *
     * @param Request $request
     * @return mixed
     */
    public function route(Request $request)
    {

        foreach($this->routes as $route){
            if($route->getMethod() == $request->getMethod()){
                preg_match($route->parseRoute(),$request->getUrl(),$matches);
                if(count($matches) > 0){
                    array_shift($matches);
                    return $route->call($request,$matches);
                    break;
                }
            }
        }

    }

}

class RouteNotValidException extends \Exception
{
}