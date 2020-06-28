<?php
session_start();
include("./config.php");
$conexion = conectarBD();

$consulta = 'DELETE FROM usuario WHERE id_usuario = "'.$_POST['idUser'].'"';
$consultar = mysqli_query($conexion, $consulta);

echo json_encode($consultar);
?>
