<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 20-Dec-15
 * Time: 17:08
 */

namespace database;


use core\Config;
use database\query\Create;
use database\query\helpers\MysqlHelper;
use database\query\helpers\SqliteHelper;
use PDO;

class Database
{
    private $connection;
    private $queryHelper;

    public function __construct()
    {
        $this->setupConnection();
    }

    private function setupConnection(){
        $config = Config::get("database.".Config::get("database.method"));
        switch(Config::get("database.method")){
            case "mysql":
                $this->connection = new PDO('mysql:host='.$config["host"].';dbname='.$config["database"].'',$config["username"],$config["password"]);
                $this->queryHelper = MysqlHelper::class;
                break;
            case "sqlite":
                $this->connection = new PDO('sqlite:'.$config["database"]);
                $this->queryHelper = SqliteHelper::class;
                break;
        }
    }

    /**
     * @param $name
     * @return Create
     */
    public function createQuery($name){
        $query = new Create();
        $query->setHelper($this->queryHelper)->table($name);

        return $query;
    }

}