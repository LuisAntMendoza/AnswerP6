<?php
session_start();
include("./config.php");
$conexion = conectarBD();

$nombre = $_POST['nomImg'];
$response = [];
for ($i=0; $i < 5; $i++) {
    $ext = "";
    if(file_exists("../../statics/img/fotosQuest/".$nombre.($i+1).".png")) {
        $ext = "png";
    }
    elseif (file_exists("../../statics/img/fotosQuest/".$nombre.($i+1).".jpg")) {
        $ext = "jpg";
    }
    elseif (file_exists("../../statics/img/fotosQuest/".$nombre.($i+1).".jpeg")) {
        $ext = "jpeg";
    }else {
        $ext = "null";
    }
    array_push($response, $ext);
}

echo json_encode($response);

 ?>
