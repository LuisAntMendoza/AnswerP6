<?php
session_start();
include("config.php");
$conexion = conectarBD();

$result = mysqli_query($conexion, 'SELECT id_encuesta, Titulo FROM encuesta WHERE id_encuesta LIKE "'.$_SESSION["idUser"].'-%"');
$response = [];
while($row = mysqli_fetch_assoc($result))
{
	array_push($response, $row);
}
echo json_encode($response);
?>
