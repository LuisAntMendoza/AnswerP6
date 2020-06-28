<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("config.php");
$conexion = conectarBD();

//obtiene los reportes y los regresa en un arreglo
$response = [];
$consulta = 'SELECT * FROM reporte';
$consultar = mysqli_query($conexion, $consulta);
while ($resultado = mysqli_fetch_row($consultar)) {
    array_push($response, $resultado);
}

echo json_encode($response);
 ?>
