<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("./config.php");
$conexion = conectarBD();

//borra la categoria de la BD
$consulta = 'DELETE FROM categoria WHERE id_categoria = "'.$_POST['idCategoria'].'"';
$consultar = mysqli_query($conexion, $consulta);

echo json_encode($consultar);
?>
