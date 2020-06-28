<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("./config.php");
$conexion = conectarBD();
//regresa el formato de la imagen del usuario
$usuario = "";
if(isset($_POST['idUser'])) {
    $usuario = $_POST['idUser'];
}
else {
    $usuario = $_SESSION['usuario'];
}
$ext = "";
if(file_exists("../../statics/img/fotosPerfil/".$usuario.".png")) {
    $ext = "png";
}
elseif (file_exists("../../statics/img/fotosPerfil/".$usuario.".jpg")) {
    $ext = "jpg";
}
elseif (file_exists("../../statics/img/fotosPerfil/".$usuario.".jpeg")) {
    $ext = "jpeg";
}
echo json_encode($ext);

?>
