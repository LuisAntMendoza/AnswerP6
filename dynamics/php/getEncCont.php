<?php
//iniciamos sesion y conectamos a la BD
session_start();
include("./config.php");
$conexion = conectarBD();
//obtenemos las encuestas que hemos contestado
$arrContestadas = [];
if (isset($_SESSION['poder'])) {
    $consulta = 'SELECT * FROM encuestas_respondidas';
    $consultar = mysqli_query($conexion, $consulta);
    while ($resultado = mysqli_fetch_row($consultar)) {
        if($resultado[0] == $_SESSION['idUser']) {
            array_push($arrContestadas, $resultado[1]);
        }
    }
}

//regresa los valores de las encuestas que hemos respondido
$response = [];
for ($i=0; $i < count($arrContestadas); $i++) {
    $result = mysqli_query($conexion, 'SELECT id_encuesta, Titulo FROM encuesta WHERE id_encuesta = "'.$arrContestadas[$i].'"');
    while($row = mysqli_fetch_assoc($result))
    {
    	array_push($response, $row);
    }
}

echo json_encode($response);

 ?>
