<?php
session_start();
include("./config.php");
$conexion = conectarBD();

$result = mysqli_query($conexion, "SELECT * FROM categoria");
$response = [];
while($row = mysqli_fetch_assoc($result))
{
	array_push($response, $row);
}
echo json_encode($response);



 ?>
