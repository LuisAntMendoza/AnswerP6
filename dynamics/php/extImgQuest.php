<?php
session_start();
include("./config.php");
$conexion = conectarBD();

$nombre = $_POST['nomImg'];
$ext = "";
if(file_exists("../../statics/img/fotosQuest/".$nombre.".png")) {
    $ext = "png";
}
elseif (file_exists("../../statics/img/fotosQuest/".$nombre.".jpg")) {
    $ext = "jpg";
}
elseif (file_exists("../../statics/img/fotosQuest/".$nombre.".jpeg")) {
    $ext = "jpeg";
}else {
    $ext = "null";
}
echo json_encode($ext);

 ?>
