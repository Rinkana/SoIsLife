<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 08-Jan-16
 * Time: 22:19
 */

namespace database\query\helpers;


class SqliteHelper implements HelperInterface
{

    static function getFieldType($type)
    {
        switch (strtolower($type)) {
            case "increments":
                return "INTEGER PRIMARY KEY AUTOINCREMENT";
                break;
            default:
                return $type;
                break;
        }
    }
}