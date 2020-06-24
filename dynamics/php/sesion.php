<?php
session_start();
include("./config.php");
$conexion = conectarBD();

function obtenerSesion() {
    $arreglo = [];
    foreach ($_SESSION as $key => $value) {
        $arreglo[$key] = $value;
    }
    return $arreglo;
}

echo json_encode(obtenerSesion());
 ?>
