<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 26-Jan-16
 * Time: 21:51
 */

namespace web;


class View
{
    private $data = [];

    public function __construct()
    {

    }

    /**
     *
     * Set the view spesific data
     *
     * @param array|mixed $data
     * @param null|mixed $value
     */
    public function setData($data, $value = null)
    {
        if (!is_null($value) && !is_array($data)) {
            $data = [$data => $value];
        }

        $this->data = array_merge($this->data, $data);
    }

    /**
     *
     * Start rendering the view
     *
     * @return string
     */
    public function render()
    {
        ob_start();
        include(ROOT."application/views/main.php");
        $html = ob_get_contents();
        ob_end_clean();

        return $html;
    }

    /**
     * Render a partial view.
     * No need for ob_start as this _should_ be called from the render function
     *
     * @param $partialName
     */
    public function renderPartial($partialName)
    {

    }
}