<?php
define("ROOT", __DIR__.DIRECTORY_SEPARATOR."..".DIRECTORY_SEPARATOR);

require( ROOT . "application/components/core/Autoloader.php");
new \core\Autoloader(array(ROOT."application/components"));

new \core\Kernel();
?>