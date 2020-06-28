<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("./config.php");
$conexion = conectarBD();

//borra el usuario de la BD
$consulta = 'DELETE FROM usuario WHERE id_usuario = "'.$_POST['idUser'].'"';
$consultar = mysqli_query($conexion, $consulta);

echo json_encode($consultar);
?>
