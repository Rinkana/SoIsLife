<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 09-Jan-16
 * Time: 15:36
 */

namespace database\orm\types;

use database\orm\parsers\CreateParser;

class CreateQuery extends AbstractQuery
{
    public function __construct($table)
    {
        $this->parser = CreateParser::class;

        $this->set("create",$table);
    }

    public function createFields($fields){
        $this->set("fields",$fields);
        return $this;
    }

    public function createField($fieldName, $fieldType){
        return $this->createFields([
            $fieldName => $fieldType
        ]);
    }
}