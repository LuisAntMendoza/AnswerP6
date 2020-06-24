<?php
session_start();
include("./config.php");
$conexion = conectarBD();
function obtenerImg() {
    $ext = "";
    if(file_exists("../../statics/img/fotosPerfil/".$_SESSION['usuario'].".png")) {
        $ext = "png";
    }
    elseif (file_exists("../../statics/img/fotosPerfil/".$_SESSION['usuario'].".jpg")) {
        $ext = "jpg";
    }
    elseif (file_exists("../../statics/img/fotosPerfil/".$_SESSION['usuario'].".jpeg")) {
        $ext = "jpeg";
    }
    return $ext;
}
echo json_encode(obtenerImg());

?>
