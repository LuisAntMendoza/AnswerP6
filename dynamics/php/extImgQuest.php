<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("./config.php");
$conexion = conectarBD();

//recibe un nombre y te devuelve la extension de esa foto (preguntas)
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
