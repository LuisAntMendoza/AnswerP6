<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("./config.php");
$conexion = conectarBD();

//regresa un arreglo con las categorias de la BD
$result = mysqli_query($conexion, "SELECT * FROM categoria");
$response = [];
while($row = mysqli_fetch_assoc($result))
{
	array_push($response, $row);
}
echo json_encode($response);



 ?>
