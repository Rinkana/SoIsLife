<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 08-Jan-16
 * Time: 21:57
 */

namespace database\query;

//Todo: get different db options
//Todo: waaaaay better parsing

use database\query\helpers\SqliteHelper;

class Create extends AbstractQuery
{

    protected $fields = array();

    public function __construct()
    {
    }

    public function addField($name,$type = null){
        if(is_array($name) && is_null($type)){
            foreach($name as $fieldName => $fieldType){
                $this->addField($fieldName,$fieldType);
            }
        }else{
            $this->fields[$name] = $this->helper::getFieldType($type);
        }
        return $this;
    }

    public function parse(){
        $raw = "CREATE TABLE ".implode(" ",$this->tables)."(". implode(", ",array_map(function($fieldType,$fieldName){
                return $fieldName." ".$fieldType;
            },$this->fields,array_keys($this->fields))) .")";

        return $raw;
    }

}