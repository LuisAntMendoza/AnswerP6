<?php
session_start();
include("config.php");
$conexion = conectarBD();
$razon = mysqli_real_escape_string($conexion, $_POST['razon']);
$consulta = 'INSERT INTO reporte (Razon, id_Encuesta) VALUES ("'.$razon.'", "'.$_POST["idEncuesta"].'")';
$consultar = mysqli_query($conexion, $consulta);
header("location: ../../templates/encuestas.html");

?>
