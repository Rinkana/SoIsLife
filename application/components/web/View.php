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
    /**
     * @var array
     */
    private $data = [];

    /**
     * @var string
     */
    private $rootFile = "core";

    private $mainView;

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

    protected function get($name){
        if(isset($this->data[$name]))
            return $this->data[$name];

        throw new viewDataNotFoundException("Parameter '".$name."' is not set in the view.");
    }

    public function setRootFile($rootFile){
        $this->rootFile = $rootFile;
    }

    /**
     *
     * Start rendering the view
     *
     * @return string
     */
    public function getHTML($viewName = "")
    {
        $this->mainView = $viewName;

        ob_start();
        $this->render($this->rootFile);
        $html = ob_get_contents();
        ob_end_clean();
        return $html;
    }

    /**
     * Render a view
     * @param string $file
     * @throws viewNotFoundException
     * @todo not found errors
     */
    protected function render($file = ""){
        if($file == ""){
            $file = $this->mainView;
        }

        $fileLocation = ROOT."application/views/".$file.".php";
        if(file_exists($fileLocation)){
            include($fileLocation);
        }else{
            throw new viewNotFoundException("Unable to render '".$file."', the file does not exists.");
        }
    }

    /**
     * Render a partial view.
     * No need for ob_start as this _should_ be called from the render function
     *
     * @param $partialName
     * @throws viewNotFoundException
     */
    protected function renderPartial($partialName)
    {
        try{
            $this->render("partials/".$partialName);
        }catch(viewNotFoundException $exception){
            //Rethrow exception with a more precise error message.
            throw new viewNotFoundException("Unable to render partial '".$partialName."', the file does not exists.");
        }
    }

}

class viewDataNotFoundException extends \Exception {}
class viewNotFoundException extends \Exception {}