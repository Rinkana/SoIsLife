<?php
/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 03-Feb-16
 * Time: 22:19
 */

namespace web;


class Response
{

    protected $headers = [];
    protected $messageBody = "";

    public function setMessageBody($data)
    {
        $this->messageBody = $data;
    }

    public function send()
    {
        echo $this->messageBody;
    }
}