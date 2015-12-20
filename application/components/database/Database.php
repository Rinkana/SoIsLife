<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 20-Dec-15
 * Time: 17:08
 */

namespace database;


use core\Config;

class Database
{
    private $connection;

    public function __construct()
    {
        $connection = new PDO('mysql:host='.Config::get("database.host").';dbname='.Config::get("database.database").'',Config::get("database.username"),Config::get("database.password"));
    }

}