<?php
session_start();
include("./config.php");
$conexion = conectarBD();

$consulta = 'SELECT Bloqueo FROM usuario WHERE id_usuario = "'.$_POST['idUser'].'"';
$consultar = mysqli_query($conexion, $consulta);
$resultado = mysqli_fetch_row($consultar);

if($resultado[0] == "true") {
    $consulta = 'UPDATE usuario SET Bloqueo = null WHERE id_usuario = "'.$_POST['idUser'].'"';
    $consultar = mysqli_query($conexion, $consulta);
}
else {
    $consulta = 'UPDATE usuario SET Bloqueo = "true" WHERE id_usuario = "'.$_POST['idUser'].'"';
    $consultar = mysqli_query($conexion, $consulta);
}



echo json_encode($consultar);


 ?>
