<?php
session_start();
include("./config.php");
$conexion = conectarBD();

$response = [];
$consulta = 'SELECT * FROM usuario';
$consultar = mysqli_query($conexion, $consulta);
while ($resultado = mysqli_fetch_row($consultar)) {
    $usuario = [];
    foreach ($resultado as $key => $value) {
        if ($key > 0 && $key < 8) {
            array_push($usuario, Decifrar($value));
        }
        else {
            array_push($usuario, $value);
        }
    }
    array_push($response, $usuario);
}

echo json_encode($response);
?>
