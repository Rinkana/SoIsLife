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

    /**
     *
     * Get a value from the array.
     * $default is the value that will be returned if the key was not found within this array
     *
     * @param $key
     * @param null $default
     * @return mixed
     */
    public function get($key, $default = null){
        if(array_key_exists($key,$this->values)){
            return $this->values[$key];
        }

        return $default;
    }

    /**
     *
     * Set or overwrite a value
     *
     * @param $key
     * @param $value
     */
    public function set($key, $value){
        $this->values[$key] = $value;
    }


    /**
     *
     * Get the current array
     *
     * @return array
     */
    public function getArray(){
        return $this->values;
    }

    /**
     * Merge the current array with the given array
     *
     * @param array $values
     */
    public function merge(array $values = []){
        $this->values = array_merge($this->values,$values);
    }

    /**
     *
     * Get the keys from current array
     *
     * @return array
     */
    public function getKeys(){
        return array_keys($this->values);
    }


}