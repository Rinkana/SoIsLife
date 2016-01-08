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

        $query = $db->createQuery("terrain")->addField([
            "id" => "increments",
            "x" => "INT(11)",
            "y" => "INT(11)",
            "file" => "VARCHAR(255)"
        ]);

        //Some examples of what to create:
        /*
         * Select("id")->from("terrain")->where("id",">",15);
         * Select(["ter.id","tree.id"])->from(["terrain" => "ter","trees" => "tree"])->on("tree.terrain","ter.id")
         *
         */


        //$query = new \database\query\Create("terrain");
        //$query

        var_dump($query);
        var_dump($query->parse());
        //include(ROOT."/application/views/main.php");
        exit();
    }
}