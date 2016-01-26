<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 26-Jan-16
 * Time: 21:52
 */

namespace utils;


class Date
{
    private $date;

    public function __construct($date)
    {
        $this->date = strtotime($date);
    }

    public function format($pattern = "Y-m-d"){
        return date($pattern,$this->date);
    }

    public static function create($dateString){
        return new Date($dateString);
    }
}