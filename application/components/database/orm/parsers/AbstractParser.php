<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 09-Jan-16
 * Time: 14:55
 */

namespace database\orm\parsers;


abstract class AbstractParser
{
    public $query;

    public function __construct($query){
        $this->query = $query;
    }

    public function get($field){
        return $this->query[$field];
    }

    public function parse(){
        throw new \Exception("Parsing not yet implemented");
    }
}