<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("./config.php");
$conexion = conectarBD();

//obtenemos el valor del bloqueo de la base de datos
$consulta = 'SELECT Bloqueo FROM usuario WHERE id_usuario = "'.$_POST['idUser'].'"';
$consultar = mysqli_query($conexion, $consulta);
$resultado = mysqli_fetch_row($consultar);

//si esta bloqueado lo desbloqueamos
if($resultado[0] == "true") {
    $consulta = 'UPDATE usuario SET Bloqueo = null WHERE id_usuario = "'.$_POST['idUser'].'"';
    $consultar = mysqli_query($conexion, $consulta);
}
//si esta desbloqueado lo bloqueamos
else {
    $consulta = 'UPDATE usuario SET Bloqueo = "true" WHERE id_usuario = "'.$_POST['idUser'].'"';
    $consultar = mysqli_query($conexion, $consulta);
}
//regresamos el valor de la consulta
echo json_encode($consultar);
 ?>
