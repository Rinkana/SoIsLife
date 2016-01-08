<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 08-Jan-16
 * Time: 21:57
 */

namespace database\query;


use database\query\helpers\HelperInterface;

abstract class AbstractQuery
{
    protected $tables = array();
    protected $helper;

    public function __construct()
    {

    }

    public function table($name){
        $this->tables[] = $name;
        return $this;
    }

    public function setHelper($helper){
        $this->helper = $helper;
        return $this;
    }

    public function parse(){

    }
}