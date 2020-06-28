<?php
session_start();
include("./config.php");
$conexion = conectarBD();
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
