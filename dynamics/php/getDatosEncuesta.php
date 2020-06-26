<?php
session_start();
include("./config.php");
$conexion = conectarBD();

$response = [];
$result = mysqli_query($conexion, 'SELECT * FROM encuesta WHERE id_encuesta = "'.$_POST["idEncuesta"].'"');
while($row = mysqli_fetch_assoc($result))
{
	array_push($response, $row);
}
for ($i=1; $i < 6; $i++) {
    $result = mysqli_query($conexion, 'SELECT * FROM pregunta WHERE id_pregunta = "'.$response[0]["id_pregunta".$i].'"');
    while($row = mysqli_fetch_assoc($result))
    {
    	array_push($response, $row);
    }
}
for ($i=0; $i < 5; $i++) {
    for ($k=0; $k < 10; $k++) {
        $result = mysqli_query($conexion, 'SELECT * FROM respuesta WHERE id_Respuesta = "'.$response[$i+1]['id_Respuesta'.$k].'"');
        while($row = mysqli_fetch_assoc($result))
        {
        	array_push($response, $row);
        }
    }
}
echo json_encode($response);

 ?>
