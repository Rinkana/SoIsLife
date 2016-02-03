<?php
/**
 * Set the root application location.
 * We assume the root is one level up from the public folder
 */
define("ROOT", __DIR__."/../");

/**
 * Include and start the core autoloader
 */
require( ROOT . "application/components/core/Autoloader.php");
new \core\Autoloader(array(ROOT."application/components"));

/**
 * Start running the application
 */
$kernel = new \core\Kernel();

/**
 * Get the response from the kernel and send it out.
 */
$kernel->getResponse()->send();
?>