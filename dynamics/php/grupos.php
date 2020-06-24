<?php
include("./config.php");
$conexion = conectarBD();

$result = mysqli_query($conexion, "SELECT * FROM grupo");
$response = [];
while($row = mysqli_fetch_assoc($result))
{
	array_push($response, $row);
}
echo json_encode($response);
?>
