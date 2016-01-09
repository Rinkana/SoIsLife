<?php

/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 19-Dec-15
 * Time: 17:53
 */
use \routing\BaseController;

class IndexController extends BaseController
{
    public function index(){
        $db = new \database\Database();

        $selectQuery = \database\orm\Query::select("*")->selectFields(["field1","field2","*"])->from("terrain");
        $createQuery = \database\orm\Query::create("terrain")->createFields([
            "id" => "increments",
            "x" => "INT(11)",
            "y" => "INT(11)",
            "file" => "VARCHAR(255)"
        ])->createField("test1","VARCHAR(44)");

        var_dump($selectQuery->parse());
        //var_dump($createQuery->parse());

        //var_dump($query->parse());
        //include(ROOT."/application/views/main.php");
        exit();
    }
}