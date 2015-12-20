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

    public function route(Request $request)
    {

        foreach($this->routes as $route){
            if($route->getMethod() == $request->getMethod()){
                preg_match($route->parseRoute(),$request->getUrl(),$matches);
                if(count($matches) > 0){
                    array_shift($matches);
                    $route->call($request,$matches);
                    break;
                }
            }
        }

    }

    private function findController(){

    }

    protected function check($url)
    {
        foreach ($this->routes as $route) {
            var_dump($route->parseRoute());
        }
    }

    /**
     * @param $routePath
     * @param $routeConfig
     * @return array
     */
    protected function parseRoute($routePath, $routeConfig)
    {
        $routeParts = array_filter(explode("/", $routePath));
        $parameters = [];

        array_walk(
            $routeParts,
            function (&$routePart) use ($routeConfig) {
                if (substr($routePart, 0, 1) == ":") {
                    //Part is parameter
                    $pattern = '([a-zA-Z0-9\-\_]+)';
                    $parameterName = substr($routePart, 1);

                    if (in_array($parameterName, $routeConfig)) {

                    } else {
                        throw new RouteNotValidException();
                    }

                    $parameters[] = $parameterName;
                    $routePart = $pattern;
                } else {
                    $routePart = preg_quote($routePart);
                }
            }
        );

        return [
            "pattern" => "@^/".implode("/", $routeParts)."$@D",
            "parameters" => $parameters,
        ];
    }
}

class RouteNotValidException extends \Exception
{
}