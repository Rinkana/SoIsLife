<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 09-Jan-16
 * Time: 14:55
 */

namespace database\orm\parsers;


class CreateParser extends AbstractParser
{

    public function parse(){

        return $this->getTable()."(".$this->getFields().")";
    }

    private function getTable(){
        $tables = (implode(" ",$this->get("create")));

        return "CREATE TABLE ".$tables;
    }

    private function getFields(){
        $fieldData = [];

        foreach($this->get("fields") as $fieldName => $fieldType){
            $field = $fieldName." ";

            switch(strtolower($fieldType)){
                case "increments":
                    $field .= "INTEGER PRIMARY KEY AUTOINCREMENT";
                    break;
                default:
                    $field .= $fieldType;
                    break;
            }

            $fieldData[] = $field;
        }

        return implode(", ",$fieldData);
    }
}