<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("config.php");
$conexion = conectarBD();

//validamos y escapamos la razon
if(preg_match("/^(\w|\s)+$/", $_POST['razon'])) {
    $razon = mysqli_real_escape_string($conexion, $_POST['razon']);
}
else {
    header("location: ../../templates/inicio.html");
}
//ingresa el reporte a la BD
$consulta = 'INSERT INTO reporte (Razon, id_Encuesta) VALUES ("'.$razon.'", "'.$_POST["idEncuesta"].'")';
$consultar = mysqli_query($conexion, $consulta);
header("location: ../../templates/encuestas.html");

?>
