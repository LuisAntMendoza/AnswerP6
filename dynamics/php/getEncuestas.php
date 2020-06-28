<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("config.php");
$conexion = conectarBD();


if(!isset($_SESSION["idUser"])) {
	$sesion = "";
}
else {
	$sesion = $_SESSION["idUser"];
}
//obtiene tus encuestas creadas
$result = mysqli_query($conexion, 'SELECT id_encuesta, Titulo FROM encuesta WHERE id_encuesta LIKE "'.$sesion.'-%"');
$response = [];
while($row = mysqli_fetch_assoc($result))
{
	array_push($response, $row);
}
echo json_encode($response);
?>
