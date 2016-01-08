<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 08-Jan-16
 * Time: 21:42
 */

namespace database;


class Query
{
    const MODE_SELECT = 1;
    const MODE_UPDATE = 2;
    const MODE_DELETE = 3;
    const MODE_ALTER = 4;
    const MODE_CREATE = 5;

    private $mode = self::MODE_SELECT;
    private $tables = [];

    public function __construct($mode)
    {
        $this->mode = $mode;
    }

    public function table($name){
        var_dump($this->tables);
        $this->tables[] = $name;
        $this->tables = array_unique($this->tables);
        return $this;
    }

    public function parse(){

    }

    public static function create($tableName){
        $query = new Query(self::MODE_CREATE);
        $query->table($tableName);
        return $query;
    }
}