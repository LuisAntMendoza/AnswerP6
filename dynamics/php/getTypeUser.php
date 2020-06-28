<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("config.php");
$conexion = conectarBD();

//obtiene los tipos de usuario de la BD
$result = mysqli_query($conexion, 'SELECT * FROM tipousuario');
$response = [];
while($row = mysqli_fetch_assoc($result))
{
	array_push($response, $row);
}
echo json_encode($response);





?>
