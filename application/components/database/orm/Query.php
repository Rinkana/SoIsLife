<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 09-Jan-16
 * Time: 14:35
 */

namespace database\orm;

use database\orm\types\CreateQuery;
use database\orm\types\SelectQuery;

class Query
{
    /*const MODE_SELECT = 1;
    const MODE_UPDATE = 2;
    const MODE_DELETE = 3;
    const MODE_ALTER = 4;
    const MODE_CREATE = 5;*/

    /**
     * create a select query
     *
     * @param $fields
     * @return Select
     */
    public static function select($fields = "*"){
        $query = new SelectQuery($fields);

        $query->selectFields($fields);

        return $query;
    }

    /**
     * @param $table
     */
    public static function update($table){

    }


    public static function delete($table){

    }

    public static function alter($table){

    }

    public static function create($table){
        $query = new CreateQuery($table);

        return $query;
    }

    public static function raw(){

    }
}