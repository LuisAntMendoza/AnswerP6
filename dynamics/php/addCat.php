<?php
session_start();
include("config.php");
$conexion = conectarBD();

if(preg_match("/^\w+$/", $_POST['Categoria'])) {
    $categoria = mysqli_real_escape_string($conexion, $_POST['Categoria']);
}
else {
    header("location: ../../templates/inicio.html");
}

$consulta = 'INSERT INTO categoria (Categoria) VALUES ("'.$categoria.'")';
$consultar = mysqli_query($conexion, $consulta);
header("location: ../../templates/admin.html");
?>
