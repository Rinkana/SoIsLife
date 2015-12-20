<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 19-Dec-15
 * Time: 16:50
 */

namespace core;


class Config
{
    /**
     * @param $var
     * @return mixed
     * @throws ConfigFileNotFoundException
     * @throws ConfigVariableNotFound
     */
    public static function get($var)
    {
        $parts = explode(".", $var);
        if (count($parts) > 0) {
            $config = include(ROOT."application/config/".$parts[0].".php");
            if (count($parts) > 1) {
                if (isset($config[$parts[1]])) {
                    return $config[$parts[1]];
                }
                throw new ConfigVariableNotFound();
            } else {
                return $config;
            }
        }
        throw new ConfigFileNotFoundException();
    }
}

class ConfigFileNotFoundException extends \Exception
{
}

class ConfigVariableNotFound extends \Exception
{
}