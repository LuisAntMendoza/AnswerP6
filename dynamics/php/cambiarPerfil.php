<?php
session_start();
include("./config.php");
$conexion = conectarBD();

function borrarImg() {
    if(file_exists("../../statics/img/fotosPerfil/".$_SESSION['usuario'].".png")) {
        unlink("../../statics/img/fotosPerfil/".$_SESSION['usuario'].".png");
    }
    elseif (file_exists("../../statics/img/fotosPerfil/".$_SESSION['usuario'].".jpg")) {
        unlink("../../statics/img/fotosPerfil/".$_SESSION['usuario'].".jpg");
    }
    elseif (file_exists("../../statics/img/fotosPerfil/".$_SESSION['usuario'].".jpeg")) {
        unlink("../../statics/img/fotosPerfil/".$_SESSION['usuario'].".jpeg");
    }
}
if($_FILES["imgPerfil"]["type"] == "image/png" || $_FILES["imgPerfil"]["type"] == "image/jpg" || $_FILES["imgPerfil"]["type"] == "image/jpeg") {
    borrarImg();
    $dir = '../../statics/img/fotosPerfil';
    $temporal = $_FILES["imgPerfil"]["tmp_name"];
    $extension = pathinfo($_FILES["imgPerfil"]["name"], PATHINFO_EXTENSION);
    rename($temporal, $dir."/".$_SESSION['usuario'].".".$extension);
    header("location: ../../templates/perfil.html");
}
else {
    header("location: ../../templates/errorRegistro.html");
    exit();
}

?>
