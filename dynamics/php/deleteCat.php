<?php
session_start();
include("./config.php");
$conexion = conectarBD();

$consulta = 'DELETE FROM categoria WHERE id_categoria = "'.$_POST['idCategoria'].'"';
$consultar = mysqli_query($conexion, $consulta);

echo json_encode($consultar);
?>
