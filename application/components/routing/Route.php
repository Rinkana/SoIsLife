<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 20-Dec-15
 * Time: 13:03
 */

namespace routing;


use web\Request;

class Route
{
    private $method; //const from router
    private $routeUrl;
    private $controller;
    private $controllerMethod;
    private $callback;
    private $parameters = [];
    private $constraints = [];

    const DEFAULT_PATTERN = '[a-zA-Z0-9\-\_]+';


    public function __construct($routeUrl)
    {
        $this->routeUrl = $routeUrl;
    }

    /**
     * @return string
     */
    public function getRouteUrl()
    {
        return $this->routeUrl;
    }

    /**
     * @return array
     */
    public function getRouteParts()
    {
        return array_filter(explode("/", $this->routeUrl));
    }


    /**
     * @param $method
     * @return $this
     */
    private function setMethod($method)
    {
        $this->method = $method;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getMethod(){
        return $this->method;
    }

    /**
     *
     * Set the callback for when the route is found correct.
     *
     * Use [controller]|[method] to call a controller. Just use the controller name.
     * Example: Script|get
     *
     * Notice that there is no "Controller" after "Script"
     *
     * @param string|callable $callback
     * @return $this
     */
    private function setCallback($callback)
    {
        if(is_string($callback)){
            $parts = preg_split('/[|:\s]/',$callback);
            if(count($parts) == 0){
                //No method found
            }elseif(count($parts) == 1){
                $this->controller = $parts[0];
                $this->controllerMethod = "index";
            }else{
                $this->controller = $parts[0];
                $this->controllerMethod = $parts[1];
            }

        }

        $this->callback = $callback;

        return $this;
    }

    /**
     *
     * Run the callback with extra parameters
     *
     * @param Request $request
     * @param array $parameters
     * @return mixed
     */
    public function call(Request $request, array $parameters){

        if(is_callable($this->callback)){
            return call_user_func_array($this->callback,$parameters);
        }

        $controllerName = $this->controller."Controller";
        $controller = new $controllerName($request);
        return call_user_func_array(array($controller,$this->controllerMethod),$parameters);
    }

    /**
     * @return mixed
     */
    public function getCallback(){
        return $this->callback;
    }

    /**
     * @param array $constraints
     * @return $this
     */
    public function setConstraints(array $constraints)
    {
        $this->constraints = $constraints;

        return $this;
    }

    /**
     *
     * Parse the route string to it will filter out the requested parameters and replace them with an regex.
     *
     * You can use your own pattern in the constaints
     *
     * @return string
     */
    public function parseRoute()
    {
        $routeParts = $this->getRouteParts();

        array_walk($routeParts,function(&$part){
            if (substr($part, 0, 1) == ":") {
                $parameterName = substr($part, 1);

                $pattern = self::DEFAULT_PATTERN;

                if(array_key_exists($parameterName,$this->constraints)){
                    $pattern = $this->constraints[$parameterName];
                }

                //Set and group
                $part = "(".$pattern.")";
            }
        });

        return "@^/".implode("/", $routeParts)."$@D";
    }

    /**
     *
     * Create a new GET route.
     * This will return itself so it can be chained
     *
     * @param $routeUrl
     * @param $callback
     * @return Route
     */
    public static function get($routeUrl, $callback)
    {
        $route = new Route($routeUrl);
        $route = $route->setMethod(Request::METHOD_GET)->setCallback($callback);

        return $route;
    }

}