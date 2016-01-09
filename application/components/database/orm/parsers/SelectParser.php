<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 09-Jan-16
 * Time: 14:51
 */

namespace database\orm\parsers;


class SelectParser extends AbstractParser
{

    public function parse(){
        return $this->getSelect();
    }

    private function getSelect(){
        return "SELECT";
    }
}