<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("./config.php");
$conexion = conectarBD();

//regresa un arreglo con todos los datos de la sesion
function obtenerSesion() {
    $arreglo = [];
    foreach ($_SESSION as $key => $value) {
        $arreglo[$key] = $value;
    }
    return $arreglo;
}

echo json_encode(obtenerSesion());
 ?>
