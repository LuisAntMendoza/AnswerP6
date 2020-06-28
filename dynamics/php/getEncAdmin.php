<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("./config.php");
$conexion = conectarBD();
//regresa todas las encuestas para usarlas en admin
$response = [];
$consulta = 'SELECT id_encuesta, Titulo, Descripcion FROM encuesta';
$consultar = mysqli_query($conexion, $consulta);
while ($resultado = mysqli_fetch_row($consultar)) {
    array_push($response, $resultado);
}

echo json_encode($response);
?>
