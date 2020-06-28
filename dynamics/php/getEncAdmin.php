<?php
session_start();
include("./config.php");
$conexion = conectarBD();
$response = [];
$consulta = 'SELECT id_encuesta, Titulo, Descripcion FROM encuesta';
$consultar = mysqli_query($conexion, $consulta);
while ($resultado = mysqli_fetch_row($consultar)) {
    array_push($response, $resultado);
}

echo json_encode($response);
?>
