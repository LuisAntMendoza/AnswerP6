<?php
session_start();
include("config.php");
$conexion = conectarBD();

foreach ($_POST as $key => $value) {
    if($value != "") {
        $value = mysqli_real_escape_string($conexion, $value);
        $consulta = 'UPDATE pregunta SET Pregunta = "'.$value.'" WHERE id_pregunta = "'.$key.'"';
        $consultar = mysqli_query($conexion, $consulta);
        $consulta = 'UPDATE respuesta SET Respuesta = "'.$value.'" WHERE id_Respuesta = "'.$key.'"';
        $consultar = mysqli_query($conexion, $consulta);
    }
}

header("location: ../../templates/editarEncuestas.html");
?>
