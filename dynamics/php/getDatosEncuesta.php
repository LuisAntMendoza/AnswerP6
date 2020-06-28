<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("./config.php");
$conexion = conectarBD();

//obtiene los valores de la encuesta
$response = [];
$result = mysqli_query($conexion, 'SELECT * FROM encuesta WHERE id_encuesta = "'.$_POST["idEncuesta"].'"');
while($row = mysqli_fetch_assoc($result))
{
	array_push($response, $row);
}
for ($i=1; $i < 6; $i++) {
	if(isset($response[0]["id_pregunta".$i])) {
		$result = mysqli_query($conexion, 'SELECT * FROM pregunta WHERE id_pregunta = "'.$response[0]["id_pregunta".$i].'"');
	    while($row = mysqli_fetch_assoc($result))
	    {
	    	array_push($response, $row);
	    }
	}
}
//obtiene los valores de las preguntas de esa encueta
for ($i=0; $i < 5; $i++) {
    for ($k=0; $k < 10; $k++) {
		if (isset($response[$i+1]['id_Respuesta'.$k])) {
			$result = mysqli_query($conexion, 'SELECT * FROM respuesta WHERE id_Respuesta = "'.$response[$i+1]['id_Respuesta'.$k].'"');
	        while($row = mysqli_fetch_assoc($result))
	        {
	        	array_push($response, $row);
	        }
		}
    }
}
//obtiene los valores de las respuestas de las preguntas de la encuesta solicitada
$consulta = 'SELECT * FROM encuestas_respondidas';
$consultar = mysqli_query($conexion, $consulta);
$contestada = false;
while ($resultado = mysqli_fetch_row($consultar)) {
	if ($resultado[0] == $_SESSION['idUser'] && $resultado[1] == $_POST['idEncuesta']) {
		$contestada = true;
	}
}
//al final devuelve un arreglo con todos los datos
array_push($response, $contestada);
echo json_encode($response);

 ?>
