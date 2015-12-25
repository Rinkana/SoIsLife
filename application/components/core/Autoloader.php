<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 19-Dec-15
 * Time: 16:02
 */

namespace core;


class Autoloader
{
    private $includePaths = [];

    public function __construct(array $paths = null)
    {
        if(!is_null($paths) && count($paths) > 0){
            $this->includePaths = $paths;

            return $this->register();
        }
    }

    /**
     * Add a new path to the autoloader
     *
     * @param $path
     * @return $this
     */
    public function add($path){
        $this->includePaths[] = $path;
        return $this;
    }

    /**
     *
     * Register the autoloader to the autoload stack.
     * All autoloaders will be appended.
     *
     * @return bool
     */
    public function register()
    {
        $paths = get_include_path().PATH_SEPARATOR;
        if(count($this->includePaths) > 0){
            $paths .= implode(PATH_SEPARATOR,$this->includePaths);
        }

        set_include_path($paths);

        return spl_autoload_register(array('static', 'loadClass'));
    }

    /**
     * Find a class within this autoloader paths
     *
     * @param $class
     * @return bool
     */
    public static function loadClass($class)
    {
        $class = self::normalize($class);

        $paths = explode(PATH_SEPARATOR, get_include_path());

        foreach ($paths as $path) {
            $filePath = $path.DIRECTORY_SEPARATOR.$class;
            if (is_file($filePath)) {
                include($filePath);

                return true;
            }
        }

        return false;
    }

    /**
     *
     * Get the correct filename for the requested class
     *
     * @param $class
     * @return string
     */
    public static function normalize($class)
    {
        $file = '';
        $last = strripos($class, '\\');
        if ($last != false) {
            $namespace = substr($class, 0, $last);
            $file = str_replace('\\', DIRECTORY_SEPARATOR, $namespace).DIRECTORY_SEPARATOR;
            $class = substr($class, $last + 1);
        }

        return $file.$class.".php";
    }
}