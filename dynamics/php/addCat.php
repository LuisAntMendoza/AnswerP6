<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("config.php");
$conexion = conectarBD();

//validamos el nombre que recibe
if(preg_match("/^(\w|\s)+$/", $_POST['Categoria'])) {
    $categoria = mysqli_real_escape_string($conexion, $_POST['Categoria']);
}
//si no cumple lo mandamos a inicio
else {
    header("location: ../../templates/inicio.html");
}

//añadimos la categoria a la BD
$consulta = 'INSERT INTO categoria (Categoria) VALUES ("'.$categoria.'")';
$consultar = mysqli_query($conexion, $consulta);
header("location: ../../templates/admin.html");
?>
