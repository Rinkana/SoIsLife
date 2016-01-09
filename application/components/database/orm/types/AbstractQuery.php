<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 09-Jan-16
 * Time: 15:36
 */

namespace database\orm\types;


abstract class AbstractQuery
{
    protected $query = [];

    protected $parser;

    public function __construct()
    {

    }

    protected function set($field, $values){
        if(!is_array($values)){$values = [$values];}

        if(isset($this->query[$field])){
            $values = array_merge($this->query[$field],$values);
        }

        $this->query[$field] = $values;
    }

    public function parse(){
        if(!is_null($this->parser)){
            $parser = new $this->parser($this->query);
            return $parser->parse();
        }

        //Todo better exception
        throw new \Exception("No parser set");
    }
}