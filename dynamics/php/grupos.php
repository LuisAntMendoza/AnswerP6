<?php
//iniciamos sesion y conectamos a la BD
include("./config.php");
$conexion = conectarBD();

//obtiene los grupos de la BD y regresa un arreglo
$result = mysqli_query($conexion, "SELECT * FROM grupo");
$response = [];
while($row = mysqli_fetch_assoc($result))
{
	array_push($response, $row);
}
echo json_encode($response);
?>
