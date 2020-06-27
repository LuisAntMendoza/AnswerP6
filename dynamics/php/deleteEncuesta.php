<?php
session_start();
include("config.php");
$conexion = conectarBD();

$consulta = 'DELETE FROM encuestas_respondidas WHERE id_Encuesta = "'.$_POST['idEncuesta'].'"';
$consultar = mysqli_query($conexion, $consulta);
$consulta = 'DELETE FROM encuesta WHERE id_encuesta = "'.$_POST['idEncuesta'].'"';
$consultar = mysqli_query($conexion, $consulta);
header("location: ../../templates/encuestas.html");

?>
