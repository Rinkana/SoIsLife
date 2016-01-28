<?php

/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 20-Jan-16
 * Time: 22:17
 */
class ModelController extends \routing\BaseController
{
    public function getTerrain($x = 0 ,$z = 0){
        $filename = ($x >= 0 ? "p".$x : "n".$x).($z >= 0 ? "p".$z : "n".$z).".terr";
        $terrainData = file_get_contents(ROOT."www/models/".$filename);
        $terrainData = explode("\n",$terrainData);
        array_walk($terrainData,function(&$row){
           $row = explode(",",$row);
        });

        $this->view->setData(compact('terrainData'));

        $this->renderView("terrain");
        //include(ROOT."/application/views/terrain.php");
    }
}