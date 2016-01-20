<!DOCTYPE html>
<html>
<head>
    <title>TEST</title>
</head>
<body>
<?php
foreach($terrainData as $rowID => $rowData){
    foreach($rowData as $vertexID => $vertexHeight){
        ?>
        <span contenteditable="" style="position: absolute;top:<?=$rowID*15?>px;left:<?=$vertexID*15?>px;"><?= $vertexHeight ?></span>
        <?php
    }
}
?>
</body>
</html>