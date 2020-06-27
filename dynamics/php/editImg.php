<?php
session_start();
include("config.php");
$conexion = conectarBD();

foreach ($_FILES as $key => $value) {
    if($value["type"] == "image/png" || $value["type"] == "image/jpg" || $value["type"] == "image/jpeg") {
        if (preg_match("/^\d+-\d+Q[1-5]R[0-9]$/", $key)) {
            $dir = '../../statics/img/fotosResp';
            $temporal = $value["tmp_name"];
            $extension = pathinfo($value["name"], PATHINFO_EXTENSION);
            rename($temporal, $dir."/".$key.".".$extension);
        }else {
            $dir = '../../statics/img/fotosQuest';
            $temporal = $value["tmp_name"];
            $extension = pathinfo($value["name"], PATHINFO_EXTENSION);
            rename($temporal, $dir."/".$key.".".$extension);
        }
    }
}
header("location: ../../templates/editarEncuestas.html");


?>
