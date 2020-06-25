<?php
session_start();
include("./config.php");
$conexion = conectarBD();

//validamos correo
if(preg_match("/^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/", $_POST['correo'])) {
    $correo = mysqli_real_escape_string($conexion, $_POST['correo']);
}
else {
    header("location:../../templates/errorRegistro.html");
    exit();
}
$_SESSION['correo'] = $correo;
$correo = Cifrar($correo);
$consulta = "SELECT Usuario FROM usuario";
$consultar = mysqli_query($conexion, $consulta);
while ($resultado = mysqli_fetch_row($consultar)) {
    if($_SESSION['usuario'] == Decifrar($resultado[0])) {
        $usuario = $resultado[0];
    }
}
$consulta = 'UPDATE usuario SET CorreoElectronico = "'.$correo.'" WHERE Usuario = "'.$usuario.'"';
$consultar = mysqli_query($conexion, $consulta);
header("location: ../../templates/perfil.html");

?>
