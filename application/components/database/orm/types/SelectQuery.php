<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 09-Jan-16
 * Time: 15:35
 */

namespace database\orm\types;

use database\orm\parsers\SelectParser;

class SelectQuery extends AbstractQuery
{
    public function __construct()
    {
        $this->parser = SelectParser::class;
    }

    public function selectFields($fields)
    {
        $this->set("select", $fields);

        return $this;
    }

    public function from($tables)
    {
        $this->set("from", $tables);

        return $this;
    }

    public function where($field, $operator = null, $value = null)
    {

    }
}