<?php

/**
 * Created by IntelliJ IDEA.
 * User: max
 * Date: 26-Jan-16
 * Time: 21:47
 */
class TerrainModel extends \database\BaseModel
{
    /**
     * @var int
     */
    private $positionX;

    /**
     * @var int
     */
    private $positionZ;

    /**
     * @return int
     */
    public function getPositionX()
    {
        return $this->positionX;
    }

    /**
     * @param int $positionX
     */
    public function setPositionX($positionX)
    {
        $this->positionX = $positionX;
    }

    /**
     * @return int
     */
    public function getPositionZ()
    {
        return $this->positionZ;
    }

    /**
     * @param int $positionZ
     */
    public function setPositionZ($positionZ)
    {
        $this->positionZ = $positionZ;
    }


}