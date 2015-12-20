<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 19-Dec-15
 * Time: 21:07
 */

namespace web;


use helpers\ArrayBin;

class Request
{
    protected $get;
    protected $post;
    protected $server;
    protected $files;
    protected $cookies;

    protected $requestUri;
    protected $url;
    protected $method;

    const METHOD_ERROR = 0;
    const METHOD_GET = 1;
    const METHOD_POST = 2;
    const METHOD_PUT = 3;
    const METHOD_DELETE = 4;

    public function __construct()
    {
        $this->setVars();
    }

    private function setVars(){

        $this->get = new ArrayBin($_GET);
        $this->post = new ArrayBin($_POST);
        $this->server = new ArrayBin($_SERVER);
        $this->files = new ArrayBin($_FILES);
        $this->cookies = new ArrayBin($_COOKIE);

        $this->requestUri = $this->server->get("REQUEST_URI");
        $this->url = "/".trim(preg_replace('/\?.*/', '', $this->server->get("REQUEST_URI")),"/");
        $this->setMethod($this->server->get("REQUEST_METHOD","GET"));
    }

    protected function setMethod($method){
        if(is_numeric($method)){
            $this->method = $method;
        }else{
            switch(strtoupper($method)){
                case "GET":
                    $method = self::METHOD_GET;
                    break;
                case "POST":
                    $method = self::METHOD_POST;
                    break;
                case "PUT";
                    $method = self::METHOD_PUT;
                    break;
                case "DELETE":
                    $method = self::METHOD_DELETE;
                    break;
                default:
                    //TODO throw exception
                    $method = self::METHOD_ERROR;
                    break;
            }
            $this->method = $method;
        }

    }

    public function getMethod($asString = false){
        return $this->method;
    }

    public function getUri(){
        return $this->requestUri;
    }

    public function getUrl(){
        return $this->url;
    }

    public function getUrlParts(){
        return array_filter(explode("/",$this->url));
    }

    public static function getValue($key){
        if(isset($_GET[$key])){
            return $_GET[$key];
        }elseif(isset($_POST[$key])){
            return $_POST[$key];
        }
    }

}