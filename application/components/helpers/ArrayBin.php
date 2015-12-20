<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 19-Dec-15
 * Time: 21:37
 */

namespace helpers;


class ArrayBin
{
    protected $values;

    public function __construct(array $values = [])
    {
        $this->values = $values;
    }

    public function get($key, $default = null){
        if(array_key_exists($key,$this->values)){
            return $this->values[$key];
        }

        return $default;
    }

    public function set($key, $value){
        $this->values[$key] = $value;
    }

    public function getArray(){
        return $this->values;
    }

    public function merge(array $values = []){
        $this->values = array_merge($this->values,$values);
    }

    public function getKeys(){
        return array_keys($this->values);
    }


}